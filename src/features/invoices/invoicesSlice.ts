import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadStorage, saveStorage, generateId } from '../../utils/storage';
import { generateInvoiceNumber } from '../../utils/formatters';
import {
  InvoiceItem,
  InvoiceTotals,
  InvoiceCalculationOptions,
  calculateInvoiceTotals,
} from '../../utils/calculations';

export interface ServicePeriod {
  start: string;
  end: string;
}

export interface PaymentMethod {
  type: string;
  details?: string;
}

export interface WithholdingTax {
  type: 'percent' | 'fixed';
  value: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  // Basic required
  clientId: string;
  issueDate: string;
  dueDate?: string;
  paymentTerms?: 'NET_7' | 'NET_14' | 'NET_30' | 'NET_60' | 'CUSTOM';
  paymentTermsCustomDays?: number;
  currency: string;
  items: InvoiceItem[];
  // Basic optional
  reference?: string; // PO/Contract/Project ref
  // Advanced
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  servicePeriod?: ServicePeriod;
  supplyDate?: string;
  placeOfSupply?: string;
  paymentCurrency?: string;
  exchangeRate?: number;
  paymentMethods?: PaymentMethod[];
  lateFeePolicy?: string;
  interestPolicy?: string;
  attachments?: Array<{ name: string; url: string }>;
  internalNotes?: string;
  notes?: string;
  latestPdfUrl?: string;
  // Calculation options
  taxInclusive?: boolean;
  invoiceLevelDiscount?: { type: 'percent' | 'fixed'; value: number };
  shippingAmount?: number;
  withholdingTax?: WithholdingTax;
  roundingMode?: 'standard' | 'up' | 'down';
  // Computed
  totals?: InvoiceTotals;
  // Legacy/compatibility
  companyId?: string;
  company?: any;
  client?: any;
  createdAt?: string;
  updatedAt?: string;
}

interface InvoicesState {
  invoices: Invoice[];
  currentInvoice: Invoice | null;
  loading: boolean;
  error: string | null;
  meta: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  summary: {
    totalOutstanding: number;
    paidLast30Days: number;
    overdueCount: number;
    draftCount: number;
  };
}

const initialState: InvoicesState = {
  invoices: [],
  currentInvoice: null,
  loading: false,
  error: null,
  meta: { page: 1, pageSize: 10, totalItems: 0, totalPages: 0 },
  summary: { totalOutstanding: 0, paidLast30Days: 0, overdueCount: 0, draftCount: 0 },
};

// Helper to compute totals for an invoice
function computeInvoiceTotals(invoice: Invoice): InvoiceTotals {
  const options: InvoiceCalculationOptions = {
    taxInclusive: invoice.taxInclusive ?? false,
    invoiceLevelDiscount: invoice.invoiceLevelDiscount,
    shippingAmount: invoice.shippingAmount,
    withholdingTax: invoice.withholdingTax,
    roundingMode: invoice.roundingMode || 'standard',
  };
  const totals = calculateInvoiceTotals(invoice.items, options);
  // Update paid/due amounts from existing invoice if present
  if (invoice.totals) {
    totals.paidAmount = invoice.totals.paidAmount || 0;
    totals.dueAmount = totals.grandTotal - totals.paidAmount;
  }
  return totals;
}

// Helper to check if invoice is overdue
function isOverdue(invoice: Invoice): boolean {
  if (invoice.status !== 'SENT' || !invoice.dueDate) return false;
  const dueDate = new Date(invoice.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return dueDate < today;
}

// Helper to update invoice status based on due date
function checkAndUpdateInvoiceStatus(invoice: Invoice): Invoice {
  if (invoice.status === 'SENT' && isOverdue(invoice)) {
    return { ...invoice, status: 'OVERDUE' };
  }
  return invoice;
}

export const fetchInvoices = createAsyncThunk(
  'invoices/fetch',
  async (filters?: {
    status?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
    currency?: string;
    minTotal?: string;
    maxTotal?: string;
    sortBy?: string;
    sortDir?: string;
    page?: number;
    pageSize?: number;
  }) => {
    const storage = loadStorage();
    let invoices = [...(storage.invoices || [])];

    // Update overdue status
    invoices = invoices.map(checkAndUpdateInvoiceStatus);

    // Apply filters
    if (filters?.status) {
      invoices = invoices.filter((inv) => inv.status === filters.status);
    }
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      invoices = invoices.filter(
        (inv) =>
          inv.invoiceNumber.toLowerCase().includes(searchLower) ||
          inv.reference?.toLowerCase().includes(searchLower) ||
          inv.client?.name?.toLowerCase().includes(searchLower)
      );
    }
    if (filters?.currency) {
      invoices = invoices.filter((inv) => inv.currency === filters.currency);
    }
    if (filters?.startDate) {
      invoices = invoices.filter((inv) => inv.issueDate >= filters.startDate!);
    }
    if (filters?.endDate) {
      invoices = invoices.filter((inv) => inv.issueDate <= filters.endDate!);
    }
    if (filters?.minTotal) {
      invoices = invoices.filter(
        (inv) => (inv.totals?.grandTotal || 0) >= parseFloat(filters.minTotal!)
      );
    }
    if (filters?.maxTotal) {
      invoices = invoices.filter(
        (inv) => (inv.totals?.grandTotal || 0) <= parseFloat(filters.maxTotal!)
      );
    }

    // Sort
    const sortBy = filters?.sortBy || 'createdAt';
    const sortDir = filters?.sortDir || 'desc';
    invoices.sort((a, b) => {
      let aVal: any = a[sortBy as keyof Invoice];
      let bVal: any = b[sortBy as keyof Invoice];
      
      if (sortBy === 'total') {
        aVal = a.totals?.grandTotal || 0;
        bVal = b.totals?.grandTotal || 0;
      }
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    // Pagination
    const page = filters?.page || 1;
    const pageSize = filters?.pageSize || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedInvoices = invoices.slice(start, end);

    // Calculate summary
    const allInvoices = loadStorage().invoices || [];
    const summary = {
      totalOutstanding: allInvoices
        .filter((inv) => inv.status === 'SENT' || inv.status === 'OVERDUE')
        .reduce((sum, inv) => sum + (inv.totals?.dueAmount || 0), 0),
      paidLast30Days: allInvoices
        .filter((inv) => {
          if (inv.status !== 'PAID') return false;
          const paidDate = new Date(inv.updatedAt || inv.issueDate);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return paidDate >= thirtyDaysAgo;
        })
        .reduce((sum, inv) => sum + (inv.totals?.grandTotal || 0), 0),
      overdueCount: allInvoices.filter((inv) => inv.status === 'OVERDUE' || isOverdue(inv)).length,
      draftCount: allInvoices.filter((inv) => inv.status === 'DRAFT').length,
    };

    return {
      data: paginatedInvoices,
      meta: {
        page,
        pageSize,
        totalItems: invoices.length,
        totalPages: Math.ceil(invoices.length / pageSize),
      },
      summary,
    };
  }
);

export const fetchInvoice = createAsyncThunk('invoices/fetchOne', async (id: string) => {
  const storage = loadStorage();
  const invoice = storage.invoices.find((inv) => inv.id === id);
  if (!invoice) {
    throw new Error('Invoice not found');
  }
    // Update totals and status
    const updated = checkAndUpdateInvoiceStatus(invoice);
    updated.totals = computeInvoiceTotals(updated);
    return updated;
});

export const createInvoice = createAsyncThunk(
  'invoices/create',
  async (data: Omit<Invoice, 'id' | 'invoiceNumber' | 'totals'>) => {
    const storage = loadStorage();
    
    // Generate invoice number
    const numbering = storage.invoiceNumbering || { prefix: 'INV', nextNumber: 1 };
    const invoiceNumber = generateInvoiceNumber(numbering.prefix, numbering.nextNumber);
    
    // Create invoice
    const newInvoice: Invoice = {
      ...data,
      id: generateId(),
      invoiceNumber,
      status: data.status || 'DRAFT',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Compute totals
    newInvoice.totals = computeInvoiceTotals(newInvoice);
    
    // Increment invoice number
    numbering.nextNumber += 1;
    storage.invoiceNumbering = numbering;
    
    storage.invoices.push(newInvoice);
    saveStorage(storage);
    
    return newInvoice;
  }
);

export const updateInvoice = createAsyncThunk(
  'invoices/update',
  async ({ id, data }: { id: string; data: Partial<Invoice> }) => {
    const storage = loadStorage();
    const index = storage.invoices.findIndex((inv) => inv.id === id);
    if (index === -1) {
      throw new Error('Invoice not found');
    }
    
    const updated: Invoice = {
      ...storage.invoices[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    // Recompute totals if items or calculation options changed
    if (data.items || data.taxInclusive !== undefined || data.invoiceLevelDiscount || data.shippingAmount !== undefined || data.withholdingTax) {
      updated.totals = computeInvoiceTotals(updated);
    }
    
    // Update status if needed
    const finalInvoice = checkAndUpdateInvoiceStatus(updated);
    
    storage.invoices[index] = finalInvoice;
    saveStorage(storage);
    
    return finalInvoice;
  }
);

export const updateInvoiceStatus = createAsyncThunk(
  'invoices/updateStatus',
  async ({ id, status }: { id: string; status: Invoice['status'] }) => {
    const storage = loadStorage();
    const index = storage.invoices.findIndex((inv) => inv.id === id);
    if (index === -1) {
      throw new Error('Invoice not found');
    }
    
    const updated: Invoice = {
      ...storage.invoices[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    
    storage.invoices[index] = updated;
    saveStorage(storage);
    
    return updated;
  }
);

export const deleteInvoice = createAsyncThunk('invoices/delete', async (id: string) => {
  const storage = loadStorage();
  storage.invoices = storage.invoices.filter((inv) => inv.id !== id);
  saveStorage(storage);
  return id;
});

export const duplicateInvoice = createAsyncThunk('invoices/duplicate', async (id: string) => {
  const storage = loadStorage();
  const original = storage.invoices.find((inv) => inv.id === id);
  if (!original) {
    throw new Error('Invoice not found');
  }
  
  // Generate new invoice number
  const numbering = storage.invoiceNumbering || { prefix: 'INV', nextNumber: 1 };
  const invoiceNumber = generateInvoiceNumber(numbering.prefix, numbering.nextNumber);
  numbering.nextNumber += 1;
  storage.invoiceNumbering = numbering;
  
  const duplicated: Invoice = {
    ...original,
    id: generateId(),
    invoiceNumber,
    status: 'DRAFT',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  duplicated.totals = computeInvoiceTotals(duplicated);
  
  storage.invoices.push(duplicated);
  saveStorage(storage);
  
  return duplicated;
});

// Generate PDF on client side
export const generatePdf = createAsyncThunk('invoices/generatePdf', async (id: string) => {
  const storage = loadStorage();
  const invoice = storage.invoices.find((inv) => inv.id === id);
  if (!invoice) {
    throw new Error('Invoice not found');
  }
  
  // Get company and client data
  const company = storage.companyProfile;
  const client = storage.clients.find((c) => c.id === invoice.clientId);
  
  // Try to use server API if available, otherwise use client-side generation
  const API_URL = import.meta.env.VITE_API_URL || '';
  const token = localStorage.getItem('accessToken');
  
  if (API_URL && token) {
    try {
      // Try server-side PDF generation
      const response = await fetch(`${API_URL}/api/invoices/${id}/generate-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });
      
      if (response.ok) {
        const result = await response.json();
        // Update invoice with PDF URL
        const index = storage.invoices.findIndex((inv) => inv.id === id);
        if (index !== -1) {
          storage.invoices[index] = { ...storage.invoices[index], latestPdfUrl: result.pdfUrl || result.latestPdfUrl };
          saveStorage(storage);
        }
        return { ...invoice, latestPdfUrl: result.pdfUrl || result.latestPdfUrl };
      }
    } catch (error) {
      console.warn('Server PDF generation failed, using client-side:', error);
    }
  }
  
  // Fallback to client-side PDF generation
  const pdfWindow = window.open('', '_blank');
  if (!pdfWindow) {
    throw new Error('Popup blocked. Please allow popups for this site.');
  }
  
  const html = generateInvoiceHtml(invoice, company, client);
  pdfWindow.document.write(html);
  pdfWindow.document.close();
  
  // Wait a bit for content to load, then trigger print
  setTimeout(() => {
    pdfWindow.print();
  }, 250);
  
  return invoice;
});

function generateInvoiceHtml(invoice: Invoice, company: any, client: any): string {
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: invoice.currency || 'USD',
    }).format(amount);
  };
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };
  
  const totals = invoice.totals || computeInvoiceTotals(invoice);
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invoice ${invoice.invoiceNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
    .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
    .company-info h2 { margin-bottom: 10px; }
    .invoice-info { text-align: right; }
    .invoice-info h1 { margin-bottom: 10px; color: #2c3e50; }
    .billing { display: flex; justify-content: space-between; margin-bottom: 30px; }
    .billing-section { flex: 1; }
    .billing-section h3 { margin-bottom: 10px; border-bottom: 2px solid #3498db; padding-bottom: 5px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    th { background: #2c3e50; color: white; padding: 12px; text-align: left; }
    td { padding: 10px; border-bottom: 1px solid #ddd; }
    .text-right { text-align: right; }
    .totals { float: right; width: 300px; margin-top: 20px; }
    .totals table { width: 100%; }
    .totals .total-row { font-weight: bold; font-size: 18px; border-top: 2px solid #333; }
    .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
    @media print {
      body { padding: 20px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="company-info">
      <h2>${company?.legalName || 'Company Name'}</h2>
      <div>${company?.addressLine1 || ''}</div>
      <div>${company?.city || ''}, ${company?.country || ''}</div>
      ${company?.email ? `<div>${company.email}</div>` : ''}
    </div>
    <div class="invoice-info">
      <h1>INVOICE</h1>
      <div><strong>Invoice #:</strong> ${invoice.invoiceNumber}</div>
      <div><strong>Date:</strong> ${formatDate(invoice.issueDate)}</div>
      ${invoice.dueDate ? `<div><strong>Due Date:</strong> ${formatDate(invoice.dueDate)}</div>` : ''}
      ${invoice.reference ? `<div><strong>Reference:</strong> ${invoice.reference}</div>` : ''}
    </div>
  </div>
  
  <div class="billing">
    <div class="billing-section">
      <h3>Bill To:</h3>
      <div><strong>${client?.name || 'Client Name'}</strong></div>
      <div>${client?.billingAddress?.line1 || ''}</div>
      <div>${client?.billingAddress?.city || ''}, ${client?.billingAddress?.country || ''}</div>
      ${client?.email ? `<div>${client.email}</div>` : ''}
    </div>
  </div>
  
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Description</th>
        <th class="text-right">Qty</th>
        <th class="text-right">Unit Price</th>
        <th class="text-right">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${invoice.items.map((item) => {
        const lineTotal = item.quantity * item.unitPrice;
        const discount = item.discount 
          ? (item.discount.type === 'percent' ? (lineTotal * item.discount.value) / 100 : item.discount.value)
          : 0;
        const afterDiscount = lineTotal - discount;
        const tax = item.tax && !invoice.taxInclusive
          ? (afterDiscount * item.tax.rate) / 100
          : 0;
        const itemTotal = afterDiscount + tax;
        return `
        <tr>
          <td>${item.title}</td>
          <td>${item.description || '-'}</td>
          <td class="text-right">${item.quantity} ${item.unit || 'pcs'}</td>
          <td class="text-right">${formatMoney(item.unitPrice)}</td>
          <td class="text-right">${formatMoney(itemTotal)}</td>
        </tr>
      `;
      }).join('')}
    </tbody>
  </table>
  
  <div class="totals">
    <table>
      <tr><td>Subtotal:</td><td class="text-right">${formatMoney(totals.subtotal)}</td></tr>
      ${totals.discountTotal > 0 ? `<tr><td>Discount:</td><td class="text-right">-${formatMoney(totals.discountTotal)}</td></tr>` : ''}
      ${totals.taxTotal > 0 ? `<tr><td>Tax:</td><td class="text-right">${formatMoney(totals.taxTotal)}</td></tr>` : ''}
      ${totals.shippingTotal > 0 ? `<tr><td>Shipping:</td><td class="text-right">${formatMoney(totals.shippingTotal)}</td></tr>` : ''}
      ${totals.withholdingTax ? `<tr><td>Withholding Tax:</td><td class="text-right">-${formatMoney(totals.withholdingTax)}</td></tr>` : ''}
      <tr class="total-row"><td>Total:</td><td class="text-right">${formatMoney(totals.grandTotal)}</td></tr>
      ${totals.paidAmount > 0 ? `<tr><td>Paid:</td><td class="text-right">${formatMoney(totals.paidAmount)}</td></tr>` : ''}
      ${totals.dueAmount > 0 ? `<tr><td>Due:</td><td class="text-right">${formatMoney(totals.dueAmount)}</td></tr>` : ''}
    </table>
  </div>
  
  ${invoice.notes ? `<div class="footer"><strong>Notes:</strong> ${invoice.notes}</div>` : ''}
</body>
</html>
  `;
}

export const recordPayment = createAsyncThunk(
  'invoices/recordPayment',
  async ({ id, data }: { id: string; data: { amount: number; date: string; method: string; note?: string } }) => {
    const storage = loadStorage();
    const index = storage.invoices.findIndex((inv) => inv.id === id);
    if (index === -1) {
      throw new Error('Invoice not found');
    }
    
    const invoice = storage.invoices[index];
    const currentPaid = invoice.totals?.paidAmount || 0;
    const newPaid = currentPaid + data.amount;
    const grandTotal = invoice.totals?.grandTotal || 0;
    
    const updated: Invoice = {
      ...invoice,
      status: newPaid >= grandTotal ? 'PAID' : invoice.status,
      totals: {
        ...(invoice.totals || computeInvoiceTotals(invoice)),
        paidAmount: newPaid,
        dueAmount: Math.max(0, grandTotal - newPaid),
      },
      updatedAt: new Date().toISOString(),
    };
    
    storage.invoices[index] = updated;
    saveStorage(storage);
    
    return updated;
  }
);

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    clearCurrentInvoice: (state) => {
      state.currentInvoice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload.data;
        state.meta = action.payload.meta;
        state.summary = action.payload.summary;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch invoices';
      })
      .addCase(fetchInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.currentInvoice = action.payload;
      })
      .addCase(fetchInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch invoice';
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.invoices.unshift(action.payload);
        state.currentInvoice = action.payload;
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        const index = state.invoices.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
        if (state.currentInvoice?.id === action.payload.id) {
          state.currentInvoice = action.payload;
        }
      })
      .addCase(updateInvoiceStatus.fulfilled, (state, action) => {
        const index = state.invoices.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
        if (state.currentInvoice?.id === action.payload.id) {
          state.currentInvoice = action.payload;
        }
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.invoices = state.invoices.filter((i) => i.id !== action.payload);
        if (state.currentInvoice?.id === action.payload) {
          state.currentInvoice = null;
        }
      })
      .addCase(duplicateInvoice.fulfilled, (state, action) => {
        state.invoices.unshift(action.payload);
        state.currentInvoice = action.payload;
      })
      .addCase(generatePdf.fulfilled, (state, action) => {
        if (state.currentInvoice?.id === action.payload.id) {
          state.currentInvoice = action.payload;
        }
        const index = state.invoices.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
      })
      .addCase(recordPayment.fulfilled, (state, action) => {
        if (state.currentInvoice?.id === action.payload.id) {
          state.currentInvoice = action.payload;
        }
        const index = state.invoices.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
      });
  },
});

export const { clearCurrentInvoice } = invoicesSlice.actions;
export default invoicesSlice.reducer;
