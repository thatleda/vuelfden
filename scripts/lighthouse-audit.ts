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

const urls: AuditTarget[] = [
  { name: 'Home', url: 'https://leda.fyi' },
  { name: 'Ramblings', url: 'https://leda.fyi/ramblings' },
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
    const slug = result.name.toLowerCase().replace(/\s+/g, '-')
    await writeFile(`lighthouse-${slug}.html`, result.report.html)
    await writeFile(`lighthouse-${slug}.json`, result.report.json)
  }

  const summary = generateMarkdownSummary(results)
  await writeFile('lighthouse-summary.md', summary)
  console.log('Reports saved to lighthouse-*.html and lighthouse-*.json')
  console.log('Summary saved to lighthouse-summary.md')
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

generateReport().catch((err) => {
  console.error('Error running Lighthouse audit:', err)
  process.exit(1)
})
