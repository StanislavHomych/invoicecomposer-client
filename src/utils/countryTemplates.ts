export type CountryCode = 'US' | 'CA' | 'AU' | 'GB' | 'EU';

export interface CountryTemplate {
  code: CountryCode;
  name: string;
  region: string;
  currency: string;
  taxLabel: string;
  taxMode: 'NONE' | 'SALES_TAX' | 'VAT';
  requiredFields: {
    company: string[];
    client: string[];
    invoice: string[];
  };
  optionalFields: {
    company: string[];
    client: string[];
    invoice: string[];
  };
  taxIdLabel: string;
  invoiceNumberPrefix?: string;
  dateFormat: string;
  currencyFormat: string;
  footerText?: string;
}

export const countryTemplates: Record<CountryCode, CountryTemplate> = {
  US: {
    code: 'US',
    name: 'United States',
    region: 'North America',
    currency: 'USD',
    taxLabel: 'Sales Tax',
    taxMode: 'SALES_TAX',
    requiredFields: {
      company: ['name'],
      client: ['name'],
      invoice: ['issueDate', 'currency', 'invoiceNumber'],
    },
    optionalFields: {
      company: ['email', 'phone', 'addressLine1', 'city', 'state', 'postalCode', 'taxIdValue'],
      client: ['email', 'phone', 'addressLine1', 'city', 'state', 'postalCode', 'shipTo'],
      invoice: ['dueDate', 'poNumber', 'paymentTerms', 'paymentDetails', 'notes', 'termsConditions'],
    },
    taxIdLabel: 'EIN / Tax ID',
    invoiceNumberPrefix: 'INV',
    dateFormat: 'MM/DD/YYYY',
    currencyFormat: '$0,0.00',
    footerText: 'Thank you for your business!',
  },
  CA: {
    code: 'CA',
    name: 'Canada',
    region: 'North America',
    currency: 'CAD',
    taxLabel: 'GST/HST',
    taxMode: 'VAT',
    requiredFields: {
      company: ['name'],
      client: ['name'],
      invoice: ['issueDate', 'currency', 'invoiceNumber'],
    },
    optionalFields: {
      company: ['email', 'phone', 'addressLine1', 'city', 'province', 'postalCode', 'taxIdValue'],
      client: ['email', 'phone', 'addressLine1', 'city', 'province', 'postalCode'],
      invoice: ['dueDate', 'poNumber', 'paymentTerms', 'taxSystem', 'notes', 'termsConditions'],
    },
    taxIdLabel: 'GST/HST Number',
    invoiceNumberPrefix: 'INV',
    dateFormat: 'YYYY-MM-DD',
    currencyFormat: '$0,0.00',
    footerText: 'Thank you for your business!',
  },
  AU: {
    code: 'AU',
    name: 'Australia',
    region: 'Oceania',
    currency: 'AUD',
    taxLabel: 'GST',
    taxMode: 'VAT',
    requiredFields: {
      company: ['name'],
      client: ['name'],
      invoice: ['issueDate', 'currency', 'invoiceNumber'],
    },
    optionalFields: {
      company: ['email', 'phone', 'addressLine1', 'city', 'state', 'postalCode', 'taxIdValue'],
      client: ['email', 'phone', 'addressLine1', 'city', 'state', 'postalCode'],
      invoice: ['dueDate', 'poNumber', 'paymentTerms', 'bankDetails', 'notes', 'termsConditions'],
    },
    taxIdLabel: 'ABN (Australian Business Number)',
    invoiceNumberPrefix: 'INV',
    dateFormat: 'DD/MM/YYYY',
    currencyFormat: '$0,0.00',
    footerText: 'Thank you for your business!',
  },
  GB: {
    code: 'GB',
    name: 'United Kingdom',
    region: 'Europe',
    currency: 'GBP',
    taxLabel: 'VAT',
    taxMode: 'VAT',
    requiredFields: {
      company: ['name'],
      client: ['name'],
      invoice: ['issueDate', 'currency', 'invoiceNumber'],
    },
    optionalFields: {
      company: ['email', 'phone', 'addressLine1', 'city', 'postalCode', 'taxIdValue', 'companyRegNumber'],
      client: ['email', 'phone', 'addressLine1', 'city', 'postalCode'],
      invoice: ['dueDate', 'poNumber', 'paymentTerms', 'bankDetails', 'notes', 'termsConditions'],
    },
    taxIdLabel: 'VAT Registration Number',
    invoiceNumberPrefix: 'INV',
    dateFormat: 'DD/MM/YYYY',
    currencyFormat: '£0,0.00',
    footerText: 'Thank you for your business!',
  },
  EU: {
    code: 'EU',
    name: 'European Union',
    region: 'Europe',
    currency: 'EUR',
    taxLabel: 'VAT',
    taxMode: 'VAT',
    requiredFields: {
      company: ['name'],
      client: ['name'],
      invoice: ['issueDate', 'currency', 'invoiceNumber'],
    },
    optionalFields: {
      company: ['email', 'phone', 'addressLine1', 'city', 'postalCode', 'country', 'taxIdValue'],
      client: ['email', 'phone', 'addressLine1', 'city', 'postalCode', 'country', 'taxIdValue'],
      invoice: ['dueDate', 'poNumber', 'paymentTerms', 'reverseCharge', 'bankDetails', 'notes', 'termsConditions'],
    },
    taxIdLabel: 'VAT ID',
    invoiceNumberPrefix: 'INV',
    dateFormat: 'DD.MM.YYYY',
    currencyFormat: '€0,0.00',
    footerText: 'Thank you for your business!',
  },
};

export function getCountryTemplate(code: CountryCode): CountryTemplate {
  return countryTemplates[code] || countryTemplates.US;
}

export function getAllCountryTemplates(): CountryTemplate[] {
  return Object.values(countryTemplates);
}

export const euCountries = [
  'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic',
  'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary',
  'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
  'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'
];
