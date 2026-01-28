import { sitemapRoutes } from '../src/sitemapRoutes';

// Minimal declaration so we can use process.env here without pulling full Node types
declare const process: {
  env: Record<string, string | undefined>;
};

function getBaseUrl() {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/+$/, '');
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/+$/, '');
  }

  // Fallback for local development
  return 'http://localhost:5173';
}

export default function handler(req: any, res: any) {
  const baseUrl = getBaseUrl();

  const urlsXml = sitemapRoutes
    .map((path) => {
      const loc = `${baseUrl}${path}`;
      return `<url><loc>${loc}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`;
    })
    .join('');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.end(sitemapXml);
}

