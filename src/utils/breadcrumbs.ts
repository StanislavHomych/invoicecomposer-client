/**
 * Generate BreadcrumbList structured data for SEO
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbs(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
