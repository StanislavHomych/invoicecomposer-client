import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../app/api';

export interface ClientTaxId {
  type: 'VAT' | 'GST' | 'SalesTax' | 'Other';
  value: string;
}

export interface BillingAddress {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
}

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
}

// Backend client interface (from Prisma)
interface BackendClient {
  id: string;
  name: string;
  email?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
  taxIdLabel?: string | null;
  taxIdValue?: string | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Frontend client interface
export interface Client {
  id: string;
  // Basic required
  name: string;
  billingAddress: BillingAddress;
  // Basic optional
  email?: string;
  phone?: string;
  // Advanced
  shippingAddress?: ShippingAddress;
  clientType?: 'Individual' | 'Business';
  taxId?: ClientTaxId;
  defaultCurrency?: string;
  defaultPaymentTerms?: 'NET_7' | 'NET_14' | 'NET_30' | 'NET_60' | 'CUSTOM';
  defaultPaymentTermsCustomDays?: number;
  notes?: string;
}

// Transform backend client to frontend format
function transformBackendToFrontend(backend: BackendClient): Client {
  return {
    id: backend.id,
    name: backend.name,
    email: backend.email || undefined,
    billingAddress: {
      line1: backend.addressLine1 || '',
      line2: backend.addressLine2 || undefined,
      city: backend.city || '',
      state: backend.state || undefined,
      postalCode: backend.postalCode || undefined,
      country: backend.country || '',
    },
    taxId: backend.taxIdValue
      ? {
          type: (backend.taxIdLabel as 'VAT' | 'GST' | 'SalesTax' | 'Other') || 'Other',
          value: backend.taxIdValue,
        }
      : undefined,
    notes: backend.notes || undefined,
  };
}

// Transform frontend client to backend format
function transformFrontendToBackend(client: Partial<Client>): {
  name: string;
  email?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  taxIdLabel?: string;
  taxIdValue?: string;
  notes?: string;
} {
  const result: {
    name: string;
    email?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    taxIdLabel?: string;
    taxIdValue?: string;
    notes?: string;
  } = {
    name: client.name || '',
  };

  // Only include email if it's not empty
  if (client.email && client.email.trim()) {
    result.email = client.email.trim();
  }

  // Only include address fields if billingAddress exists and has data
  if (client.billingAddress) {
    if (client.billingAddress.line1 && client.billingAddress.line1.trim()) {
      result.addressLine1 = client.billingAddress.line1.trim();
    }
    if (client.billingAddress.line2 && client.billingAddress.line2.trim()) {
      result.addressLine2 = client.billingAddress.line2.trim();
    }
    if (client.billingAddress.city && client.billingAddress.city.trim()) {
      result.city = client.billingAddress.city.trim();
    }
    if (client.billingAddress.state && client.billingAddress.state.trim()) {
      result.state = client.billingAddress.state.trim();
    }
    if (client.billingAddress.postalCode && client.billingAddress.postalCode.trim()) {
      result.postalCode = client.billingAddress.postalCode.trim();
    }
    if (client.billingAddress.country && client.billingAddress.country.trim()) {
      result.country = client.billingAddress.country.trim();
    }
  } else {
    // If billingAddress is not provided, don't include address fields
    // This allows creating clients with just name
  }

  // Only include tax ID if it exists
  if (client.taxId?.value && client.taxId.value.trim()) {
    result.taxIdLabel = client.taxId.type;
    result.taxIdValue = client.taxId.value.trim();
  }

  // Only include notes if it's not empty
  if (client.notes && client.notes.trim()) {
    result.notes = client.notes.trim();
  }

  return result;
}

interface ClientsState {
  clients: Client[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientsState = {
  clients: [],
  loading: false,
  error: null,
};

export const fetchClients = createAsyncThunk('clients/fetch', async () => {
  const backendClients = await api.get<BackendClient[]>('/api/clients');
  return backendClients.map(transformBackendToFrontend);
});

export const createClient = createAsyncThunk(
  'clients/create',
  async (data: Omit<Client, 'id'>) => {
    const backendData = transformFrontendToBackend(data);
    const backendClient = await api.post<BackendClient>('/api/clients', backendData);
    return transformBackendToFrontend(backendClient);
  }
);

export const updateClient = createAsyncThunk(
  'clients/update',
  async ({ id, data }: { id: string; data: Partial<Client> }) => {
    const backendData = transformFrontendToBackend(data);
    const backendClient = await api.put<BackendClient>(`/api/clients/${id}`, backendData);
    return transformBackendToFrontend(backendClient);
  }
);

export const deleteClient = createAsyncThunk(
  'clients/delete',
  async (id: string) => {
    await api.delete(`/api/clients/${id}`);
    return id;
  }
);

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch clients';
      })
      .addCase(createClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients.push(action.payload);
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create client';
      })
      .addCase(updateClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.clients.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update client';
      })
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = state.clients.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete client';
      });
  },
});

export default clientsSlice.reducer;
