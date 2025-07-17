<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>Vuelfden - XML Sitemap</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          :root {
            --primary-color: #000000;
            --secondary-color: #94e4af;
            --tertiary-color: rgb(23, 67, 41);
            --text-color: #000000;
            --subtext-color: #555555;
            --background-color: #d2d2d2;
            --card-background-color: #dddddd;
            --border-radius: 1rem;
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --primary-color: #fafafa;
              --secondary-color: #0c4e28;
              --tertiary-color: #527766;
              --text-color: #b1b1b1;
              --subtext-color: #e6e6e6;
              --background-color: #121212;
              --card-background-color: #202020;
            }
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            font-family: 'Fira Sans', sans-serif;
            background-color: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
            padding: 2rem;
            transition: all 0.3s ease;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: var(--card-background-color);
            border-radius: var(--border-radius);
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          h1 {
            font-family: 'Silkscreen', monospace;
            color: var(--primary-color);
            font-size: 2.5rem;
            margin-bottom: 1rem;
            text-align: center;
            border-bottom: 3px solid var(--secondary-color);
            padding-bottom: 1rem;
          }

          .intro {
            text-align: center;
            margin-bottom: 2rem;
            color: var(--subtext-color);
            font-size: 1.1rem;
          }

          .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .stat-card {
            background: linear-gradient(135deg, var(--secondary-color), var(--tertiary-color));
            color: var(--primary-color);
            padding: 1.5rem;
            border-radius: var(--border-radius);
            text-align: center;
            font-weight: bold;
          }

          .stat-number {
            font-size: 2rem;
            display: block;
            margin-bottom: 0.5rem;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
            background-color: var(--background-color);
            border-radius: var(--border-radius);
            overflow: hidden;
          }

          th, td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid var(--tertiary-color);
          }

          th {
            background-color: var(--tertiary-color);
            color: var(--primary-color);
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          tr:nth-child(even) {
            background-color: var(--card-background-color);
          }

          tr:hover {
            background-color: var(--secondary-color);
            color: var(--primary-color);
            transition: all 0.3s ease;
          }

          .url {
            color: var(--tertiary-color);
            text-decoration: none;
            font-weight: 500;
          }

          .url:hover {
            color: var(--primary-color);
            text-decoration: underline;
          }

          .priority {
            display: inline-block;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: bold;
          }

          .priority-high { background-color: #28a745; color: white; }
          .priority-medium { background-color: #ffc107; color: black; }
          .priority-low { background-color: #6c757d; color: white; }

          .lastmod {
            font-family: monospace;
            color: var(--subtext-color);
            font-size: 0.9rem;
          }

          .footer {
            margin-top: 2rem;
            text-align: center;
            color: var(--subtext-color);
            font-size: 0.9rem;
            border-top: 1px solid var(--tertiary-color);
            padding-top: 1rem;
          }

          @media (max-width: 768px) {
            body { padding: 1rem; }
            .container { padding: 1rem; }
            h1 { font-size: 2rem; }
            table { font-size: 0.9rem; }
            th, td { padding: 0.5rem; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Map of Vuelfden</h1>
          
          <div class="intro">
            <p>This XML sitemap contains <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> URLs for search engines to crawl and index. Have fun, little assholes.</p>
          </div>

          <div class="stats">
            <div class="stat-card">
              <span class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority='1.0'])"/></span>
              High Priority
            </div>
            <div class="stat-card">
              <span class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority='0.8' or sitemap:priority='0.7'])"/></span>
              Medium Priority
            </div>
            <div class="stat-card">
              <span class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority='0.6' or sitemap:priority='0.5'])"/></span>
              Low Priority
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:sort select="sitemap:priority" order="descending"/>
                <tr>
                  <td>
                    <a href="{sitemap:loc}" class="url" target="_blank">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td class="lastmod">
                    <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="sitemap:priority >= 0.8">
                        <span class="priority priority-high"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:when>
                      <xsl:when test="sitemap:priority >= 0.6">
                        <span class="priority priority-medium"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="priority priority-low"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>

          <div class="footer">
            <p>Generated automatically by the grace of Claude's gentle hand and the disgustingness of XSLT, fuck C.H.Beck and their obsession with it, cursed be thy name.</p>
            <a href="/" class="url">← Back to Home</a>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
