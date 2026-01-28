// List of URLs to include in the XML sitemap.
// When you add new public pages, just append their paths here.

export const sitemapRoutes: string[] = [
  '/',
  '/about',
  '/privacy',
  '/terms',
  '/blog',
  '/blog/country-specific-invoice-requirements',
  '/blog/simple-invoices-for-small-businesses',
  '/login',
  '/register',
  '/invoice-builder',
  '/create',
  // Authenticated (app) routes – include only if you want them indexed:
  '/dashboard',
  '/company',
  '/clients',
  '/invoices/new',
  // Dynamic invoice detail pages (/invoices/:id) are not listed individually here.
];

