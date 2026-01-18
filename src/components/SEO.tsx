import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: object;
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
}

const baseUrl = import.meta.env.VITE_BASE_URL || 'https://invoicecomposer.com';
const defaultTitle = 'Invoice Composer - Free Online Invoice Generator';
const defaultDescription = 'Create professional invoices online for free. Generate PDF invoices for any country with automatic tax calculations, multiple currencies, and beautiful templates.';
const defaultImage = `${baseUrl}/og-image.jpg`;

export default function SEO({
  title,
  description = defaultDescription,
  keywords = 'invoice generator, free invoice, online invoice, PDF invoice, invoice template, invoice creator, invoice maker, professional invoice',
  image = defaultImage,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  structuredData,
  noindex = false,
  nofollow = false,
  canonical,
}: SEOProps) {
  const fullTitle = title ? `${title} | Invoice Composer` : defaultTitle;
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : fullUrl;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    if (author) updateMetaTag('author', author);

    // Robots
    const robotsContent = [
      noindex ? 'noindex' : 'index',
      nofollow ? 'nofollow' : 'follow',
    ].join(', ');
    updateMetaTag('robots', robotsContent);

    // Open Graph
    updateMetaTag('og:title', fullTitle, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:image:width', '1200', 'property');
    updateMetaTag('og:image:height', '630', 'property');
    updateMetaTag('og:image:alt', fullTitle, 'property');
    updateMetaTag('og:url', fullUrl, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', 'Invoice Composer', 'property');
    updateMetaTag('og:locale', 'en_US', 'property');

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:site', '@invoicecomposer');
    updateMetaTag('twitter:creator', '@invoicecomposer');

    // Article specific
    if (type === 'article') {
      if (publishedTime) updateMetaTag('article:published_time', publishedTime, 'property');
      if (modifiedTime) updateMetaTag('article:modified_time', modifiedTime, 'property');
      if (author) updateMetaTag('article:author', author, 'property');
    }

    // Canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', canonicalUrl);

    // Language alternates (for future multilingual support)
    // Can be extended with hreflang tags when needed
    const htmlElement = document.documentElement;
    if (!htmlElement.hasAttribute('lang')) {
      htmlElement.setAttribute('lang', 'en');
    }

    // Add viewport meta if not present (should be in HTML, but just in case)
    let viewportElement = document.querySelector('meta[name="viewport"]');
    if (!viewportElement) {
      viewportElement = document.createElement('meta');
      viewportElement.setAttribute('name', 'viewport');
      viewportElement.setAttribute('content', 'width=device-width, initial-scale=1.0');
      document.head.appendChild(viewportElement);
    }

    // Structured Data (JSON-LD)
    if (structuredData) {
      let scriptElement = document.querySelector('script[type="application/ld+json"]');
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(structuredData);
    }
  }, [
    fullTitle,
    description,
    keywords,
    image,
    fullUrl,
    canonicalUrl,
    type,
    author,
    publishedTime,
    modifiedTime,
    structuredData,
    noindex,
    nofollow,
  ]);

  return null;
}
