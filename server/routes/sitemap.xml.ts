import { pageSeo, defaultSiteUrl } from '../../data/seo'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const siteUrl = ((config.public.siteUrl as string) || defaultSiteUrl).replace(/\/$/, '')
  const now = new Date().toISOString()

  const routes = Object.values(pageSeo).map((page) => ({
    loc: `${siteUrl}${page.path === '/' ? '' : page.path}`,
    changefreq: page.path === '/' ? 'weekly' : 'monthly',
    priority: page.path === '/' ? '1.0' : page.path === '/contact' || page.path === '/services' ? '0.9' : '0.8',
  }))

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${r.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')
  return body
})
