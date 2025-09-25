import groq from 'groq'
import { sanityClient } from '~/composables/useSanity'

export default defineEventHandler(async (event) => {
  const client = sanityClient()

  const baseUrl = process.env.NETLIFY_URL || 'https://leda.fyi'

  const query = groq`*[_type == "article" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt,
    publishedAt
  }`

  const articles = await client.fetch(query)

  const staticPages = [
    { url: '/', lastmod: new Date().toISOString(), priority: '1.0' },
    { url: '/imprint', lastmod: new Date().toISOString(), priority: '0.5' },
    { url: '/privacy', lastmod: new Date().toISOString(), priority: '0.5' },
    { url: '/ramblings', lastmod: new Date().toISOString(), priority: '0.8' },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${articles.map((post: any) => `  <url>
    <loc>${baseUrl}/ramblings/${post.slug}</loc>
    <lastmod>${post._updatedAt || post.publishedAt}</lastmod>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return sitemap
})
