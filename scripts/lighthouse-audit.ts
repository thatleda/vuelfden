#!/usr/bin/env node --experimental-strip-types

import { writeFile } from 'node:fs/promises'
import lighthouse from 'lighthouse'
import { chromium } from 'playwright'

interface AuditTarget {
  name: string
  url: string
}

interface AuditResult {
  name: string
  url: string
  scores: Record<string, number>
  report: {
    html: string
    json: string
  }
}

const baseUrl = process.env.NETLIFY_URL || 'https://leda.fyi'

const urls: AuditTarget[] = [
  { name: 'Home', url: baseUrl },
  { name: 'Ramblings', url: `${baseUrl}/ramblings` },
]

const categories = ['performance', 'accessibility', 'best-practices', 'seo'] as const

async function runAudit(url: string) {
  const browser = await chromium.launch({
    args: ['--remote-debugging-port=9222'],
  })

  const options = {
    logLevel: 'info' as const,
    output: ['html' as const, 'json' as const],
    onlyCategories: categories as unknown as string[],
    port: 9222,
  }

  const runnerResult = await lighthouse(url, options)
  await browser.close()

  return runnerResult
}

async function generateReport(): Promise<void> {
  const results: AuditResult[] = []

  console.log('Running Lighthouse audits...\n')

  for (const { name, url } of urls) {
    console.log(`Auditing ${name}: ${url}`)
    const result = await runAudit(url)

    if (!result) {
      console.error(`Failed to audit ${name}`)
      continue
    }

    const scores: Record<string, number> = {}
    for (const category of categories) {
      const score = result.lhr.categories[category]?.score
      scores[category] = score ? Math.round(score * 100) : 0
    }

    results.push({
      name,
      url,
      scores,
      report: {
        html: result.report[0] as string,
        json: result.report[1] as string,
      },
    })

    console.log(`  Performance: ${scores.performance}`)
    console.log(`  Accessibility: ${scores.accessibility}`)
    console.log(`  Best Practices: ${scores['best-practices']}`)
    console.log(`  SEO: ${scores.seo}\n`)
  }

  for (const result of results) {
    const slug = result.name.toLowerCase().replaceAll(/\s+/g, '-')
    await writeFile(`lighthouse-${slug}.html`, result.report.html)
    await writeFile(`lighthouse-${slug}.json`, result.report.json)
  }

  const summary = generateMarkdownSummary(results)
  await writeFile('lighthouse-summary.md', summary)

  const htmlIndex = generateHtmlIndex(results)
  await writeFile('lighthouse-index.html', htmlIndex)

  console.log('Reports saved to lighthouse-*.html and lighthouse-*.json')
  console.log('Summary saved to lighthouse-summary.md')
  console.log('Index saved to lighthouse-index.html')
}

function generateMarkdownSummary(results: AuditResult[]): string {
  let md = '# Lighthouse Audit Summary\n\n'

  for (const result of results) {
    md += `## ${result.name}\n\n`
    md += `URL: ${result.url}\n\n`
    md += '| Category | Score |\n'
    md += '|----------|-------|\n'

    for (const [category, score] of Object.entries(result.scores)) {
      const label = category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      md += `| ${label} | ${score} |\n`
    }

    md += '\n'
  }

  return md
}

function generateScoreClass(score: number): string {
  if (score >= 90)
    return 'good'
  if (score >= 50)
    return 'average'
  return 'poor'
}

function generateHtmlIndex(results: AuditResult[]): string {
  const timestamp = new Date().toISOString()

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lighthouse Audit Results</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      background: #f5f5f5;
    }
    h1 { margin-bottom: 0.5rem; color: #333; }
    .timestamp { color: #666; font-size: 0.9rem; margin-bottom: 2rem; }
    .results { display: grid; gap: 2rem; }
    .page-result {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .page-result h2 { margin-bottom: 0.5rem; color: #333; }
    .page-result .url {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
      word-break: break-all;
    }
    .scores {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .score-card {
      padding: 1rem;
      border-radius: 6px;
      background: #f9f9f9;
      border: 2px solid #e0e0e0;
    }
    .score-card.good { border-color: #0cce6b; background: #f0fdf4; }
    .score-card.average { border-color: #ffa400; background: #fffbf0; }
    .score-card.poor { border-color: #ff4e42; background: #fef2f2; }
    .score-label {
      font-weight: 600;
      color: #333;
      margin-bottom: 0.25rem;
    }
    .score-value {
      font-size: 2rem;
      font-weight: 700;
    }
    .good .score-value { color: #0cce6b; }
    .average .score-value { color: #ffa400; }
    .poor .score-value { color: #ff4e42; }
    .reports {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .report-link {
      padding: 0.75rem 1.5rem;
      background: #4285f4;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      transition: background 0.2s;
    }
    .report-link:hover { background: #357ae8; }
  </style>
</head>
<body>
  <h1>Lighthouse Audit Results</h1>
  <div class="timestamp">Generated: ${timestamp}</div>

  <div class="results">
`

  for (const result of results) {
    const slug = result.name.toLowerCase().replaceAll(/\s+/g, '-')
    html += `
    <div class="page-result">
      <h2>${result.name}</h2>
      <div class="url">${result.url}</div>

      <div class="scores">
`

    for (const [category, score] of Object.entries(result.scores)) {
      const label = category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      const scoreClass = generateScoreClass(score)

      html += `
        <div class="score-card ${scoreClass}">
          <div class="score-label">${label}</div>
          <div class="score-value">${score}</div>
        </div>
`
    }

    html += `
      </div>

      <div class="reports">
        <a href="lighthouse-${slug}.html" class="report-link">View Full Report</a>
        <a href="lighthouse-${slug}.json" class="report-link">Download JSON</a>
      </div>
    </div>
`
  }

  html += `
  </div>
</body>
</html>
`

  return html
}

generateReport().catch((err) => {
  console.error('Error running Lighthouse audit:', err)
  process.exit(1)
})
