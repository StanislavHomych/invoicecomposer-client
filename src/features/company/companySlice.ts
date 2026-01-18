import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadStorage, saveStorage, generateId } from '../../utils/storage';

export interface TaxId {
  type: 'VAT' | 'GST' | 'SalesTax' | 'Other';
  label: string;
  value: string;
}

export interface ContactPerson {
  name: string;
  title: string;
}

export interface LocaleSettings {
  dateFormat: string;
  numberFormat: string;
}

export interface InvoiceNumbering {
  prefix: string;
  nextNumber: number;
}

export interface CompanyProfile {
  id: string;
  // Basic required
  legalName: string;
  addressLine1: string;
  city: string;
  country: string;
  email: string;
  defaultCurrency: string;
  invoiceNumbering: InvoiceNumbering;
  // Basic optional
  phone?: string;
  website?: string;
  logoUrl?: string;
  // Advanced
  tradingName?: string;
  registrationNumber?: string;
  taxIds?: TaxId[];
  defaultPaymentTerms?: 'NET_7' | 'NET_14' | 'NET_30' | 'NET_60' | 'CUSTOM';
  defaultPaymentTermsCustomDays?: number;
  contactPerson?: ContactPerson;
  localeSettings?: LocaleSettings;
  addressLine2?: string;
  state?: string;
  postalCode?: string;
  timeZone?: string;
  bankDetails?: string;
}

interface CompanyState {
  company: CompanyProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  company: null,
  loading: false,
  error: null,
};

export const fetchCompany = createAsyncThunk('company/fetch', async () => {
  const storage = loadStorage();
  return storage.companyProfile;
});

export const updateCompany = createAsyncThunk(
  'company/update',
  async (data: Partial<CompanyProfile>) => {
    const storage = loadStorage();
    const companyId = storage.companyProfile?.id || generateId();
    
    const updatedCompany: CompanyProfile = {
      id: companyId,
      legalName: data.legalName || storage.companyProfile?.legalName || '',
      addressLine1: data.addressLine1 || storage.companyProfile?.addressLine1 || '',
      city: data.city || storage.companyProfile?.city || '',
      country: data.country || storage.companyProfile?.country || '',
      email: data.email || storage.companyProfile?.email || '',
      defaultCurrency: data.defaultCurrency || storage.companyProfile?.defaultCurrency || 'USD',
      invoiceNumbering: data.invoiceNumbering || storage.companyProfile?.invoiceNumbering || {
        prefix: 'INV',
        nextNumber: 1,
      },
      ...storage.companyProfile,
      ...data,
    };
    
    storage.companyProfile = updatedCompany;
    // Also update invoice numbering if changed
    if (data.invoiceNumbering) {
      storage.invoiceNumbering = data.invoiceNumbering;
    }
    saveStorage(storage);
    
    return updatedCompany;
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch company';
      })
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update company';
      });
  },
});

export default companySlice.reducer;
