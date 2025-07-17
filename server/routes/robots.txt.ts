export default defineEventHandler(async (event) => {
  const baseUrl = process.env.URL || 'https://leda.fyi'

  const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`

  // Set proper headers
  setHeader(event, 'Content-Type', 'text/plain')
  setHeader(event, 'Cache-Control', 'public, max-age=86400') // Cache for 24 hours

  return robots
})
