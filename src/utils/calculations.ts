// Invoice calculation utilities

export interface LineDiscount {
  type: 'percent' | 'fixed';
  value: number;
}

export interface LineTax {
  name: string;
  rate: number; // percentage
}

export interface InvoiceItem {
  id?: string;
  title: string;
  description?: string;
  quantity: number;
  unit: string; // pcs, hours, days, service
  unitPrice: number;
  discount?: LineDiscount;
  tax?: LineTax;
  sku?: string;
  itemCode?: string;
  hsCode?: string;
  lineServicePeriod?: {
    start: string;
    end: string;
  };
}

export interface InvoiceTotals {
  subtotal: number;
  discountTotal: number;
  taxableTotal: number;
  taxTotal: number;
  taxSummary: Array<{ name: string; rate: number; amount: number }>;
  shippingTotal: number;
  withholdingTax?: number;
  grandTotal: number;
  paidAmount: number;
  dueAmount: number;
}

export interface InvoiceCalculationOptions {
  taxInclusive: boolean; // true = tax included in prices, false = tax added
  invoiceLevelDiscount?: LineDiscount;
  shippingAmount?: number;
  withholdingTax?: {
    type: 'percent' | 'fixed';
    value: number;
  };
  roundingMode?: 'standard' | 'up' | 'down';
}

export function calculateLineSubtotal(item: InvoiceItem): number {
  return item.quantity * item.unitPrice;
}

export function calculateLineDiscount(item: InvoiceItem): number {
  if (!item.discount) return 0;
  const subtotal = calculateLineSubtotal(item);
  if (item.discount.type === 'percent') {
    return (subtotal * item.discount.value) / 100;
  }
  return item.discount.value;
}

export function calculateLineAfterDiscount(item: InvoiceItem): number {
  const subtotal = calculateLineSubtotal(item);
  const discount = calculateLineDiscount(item);
  return subtotal - discount;
}

export function calculateLineTax(
  item: InvoiceItem,
  afterDiscount: number,
  taxInclusive: boolean
): number {
  if (!item.tax) return 0;
  
  if (taxInclusive) {
    // Tax is included in the price, so we need to extract it
    // price = base + tax, where tax = base * rate/100
    // base = price / (1 + rate/100)
    // tax = price - base = price - price/(1 + rate/100) = price * (1 - 1/(1 + rate/100))
    const rate = item.tax.rate / 100;
    return afterDiscount * (1 - 1 / (1 + rate));
  } else {
    // Tax is added on top
    return (afterDiscount * item.tax.rate) / 100;
  }
}

export function calculateInvoiceTotals(
  items: InvoiceItem[],
  options: InvoiceCalculationOptions
): InvoiceTotals {
  let subtotal = 0;
  let discountTotal = 0;
  let taxableTotal = 0;
  const taxMap = new Map<string, { name: string; rate: number; amount: number }>();

  // Calculate per-line totals
  items.forEach((item) => {
    const lineSubtotal = calculateLineSubtotal(item);
    const lineDiscount = calculateLineDiscount(item);
    const lineAfterDiscount = lineSubtotal - lineDiscount;
    
    subtotal += lineSubtotal;
    discountTotal += lineDiscount;
    taxableTotal += lineAfterDiscount;

    // Calculate tax per line
    if (item.tax) {
      const lineTax = calculateLineTax(item, lineAfterDiscount, options.taxInclusive);
      const key = `${item.tax.name}-${item.tax.rate}`;
      const existing = taxMap.get(key) || { name: item.tax.name, rate: item.tax.rate, amount: 0 };
      existing.amount += lineTax;
      taxMap.set(key, existing);
    }
  });

  // Apply invoice-level discount if any
  if (options.invoiceLevelDiscount) {
    const invoiceDiscount =
      options.invoiceLevelDiscount.type === 'percent'
        ? (taxableTotal * options.invoiceLevelDiscount.value) / 100
        : options.invoiceLevelDiscount.value;
    discountTotal += invoiceDiscount;
    taxableTotal -= invoiceDiscount;
  }

  // Calculate tax total
  let taxTotal = 0;
  const taxSummary: Array<{ name: string; rate: number; amount: number }> = [];
  taxMap.forEach((tax) => {
    taxTotal += tax.amount;
    taxSummary.push(tax);
  });

  // Apply shipping
  const shippingTotal = options.shippingAmount || 0;

  // Calculate withholding tax
  let withholdingTax = 0;
  if (options.withholdingTax) {
    const baseForWHT = taxableTotal + taxTotal;
    if (options.withholdingTax.type === 'percent') {
      withholdingTax = (baseForWHT * options.withholdingTax.value) / 100;
    } else {
      withholdingTax = options.withholdingTax.value;
    }
  }

  // Calculate grand total
  let grandTotal = taxableTotal + taxTotal + shippingTotal - withholdingTax;

  // Apply rounding
  const roundingMode = options.roundingMode || 'standard';
  if (roundingMode === 'up') {
    grandTotal = Math.ceil(grandTotal * 100) / 100;
  } else if (roundingMode === 'down') {
    grandTotal = Math.floor(grandTotal * 100) / 100;
  } else {
    grandTotal = Math.round(grandTotal * 100) / 100;
  }

  // Round all amounts to 2 decimals
  const round = (n: number) => Math.round(n * 100) / 100;

  return {
    subtotal: round(subtotal),
    discountTotal: round(discountTotal),
    taxableTotal: round(taxableTotal),
    taxTotal: round(taxTotal),
    taxSummary,
    shippingTotal: round(shippingTotal),
    withholdingTax: withholdingTax > 0 ? round(withholdingTax) : undefined,
    grandTotal: round(grandTotal),
    paidAmount: 0, // Will be set from invoice data
    dueAmount: round(grandTotal), // Will be adjusted based on payments
  };
}
