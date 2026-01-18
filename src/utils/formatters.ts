// Helper utilities for formatting

export function formatMoney(currency: string, amount: number, locale: string = 'en-US'): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    // Fallback if currency is invalid
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export function formatDate(date: Date | string, locale: string = 'en-US'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  // If format is specified, use it (for future date format customization)
  // For now, use locale-based formatting
  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(dateObj);
  } catch (error) {
    return dateObj.toLocaleDateString();
  }
}

export function generateInvoiceNumber(
  prefix: string,
  nextNumber: number,
  padding: number = 4
): string {
  const paddedNumber = String(nextNumber).padStart(padding, '0');
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${paddedNumber}`;
}

// Parse invoice number to extract next number (for migration)
export function parseInvoiceNumber(invoiceNumber: string): number | null {
  const match = invoiceNumber.match(/-(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}
