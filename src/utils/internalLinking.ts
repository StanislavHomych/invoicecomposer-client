/**
 * Internal linking utility for SEO
 * Helps maintain consistent internal linking structure
 */

export const internalLinks = {
  home: '/',
  about: '/about',
  blog: '/blog',
  blogCountryRequirements: '/blog/country-specific-invoice-requirements',
  blogSimpleInvoices: '/blog/simple-invoices-for-small-businesses',
  invoiceBuilder: '/invoice-builder',
  create: '/create',
  privacy: '/privacy',
  terms: '/terms',
  login: '/login',
  register: '/register',
} as const;

/**
 * Get anchor text for internal links (for consistency)
 */
export const getAnchorText = (key: keyof typeof internalLinks): string => {
  const anchorTexts: Record<keyof typeof internalLinks, string> = {
    home: 'Invoice Composer - Free Online Invoice Generator',
    about: 'About Invoice Composer',
    blog: 'Invoice Blog - Tips & Guides',
    blogCountryRequirements: 'Country-Specific Invoice Requirements Guide',
    blogSimpleInvoices: 'Simple Invoices for Small Businesses',
    invoiceBuilder: 'Free Invoice Builder',
    create: 'Create Invoice Online',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    login: 'Sign In',
    register: 'Register',
  };
  return anchorTexts[key];
};
