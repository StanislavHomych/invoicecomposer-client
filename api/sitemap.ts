import { sitemapRoutes } from './_sitemapRoutes';

// Minimal declaration so we can use process.env here without pulling full Node types
declare const process: {
  env: Record<string, string | undefined>;
};

function getHeader(req: any, name: string): string | undefined {
  const key = name.toLowerCase();
  const headers = req?.headers ?? {};
  const value = headers[key] ?? headers[name];
  if (Array.isArray(value)) return value[0];
  return typeof value === 'string' ? value : undefined;
}

function getBaseUrl(req: any) {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/+$/, '');
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/+$/, '');
  }

  // Try to derive from request (works on Vercel even without env vars)
  const host = getHeader(req, 'x-forwarded-host') ?? getHeader(req, 'host');
  const proto = getHeader(req, 'x-forwarded-proto') ?? 'https';
  if (host) return `${proto}://${host}`.replace(/\/+$/, '');

  return 'https://localhost';
}

export default function handler(req: any, res: any) {
  const baseUrl = getBaseUrl(req);

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

