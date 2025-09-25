export default defineEventHandler(async (event) => {
  const baseUrl = process.env.NETLIFY_URL || 'https://leda.fyi'

  const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`

  setHeader(event, 'Content-Type', 'text/plain')
  setHeader(event, 'Cache-Control', 'public, max-age=86400')

  return robots
})
