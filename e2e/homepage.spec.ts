import { expect, test } from '@playwright/test'

test.describe('Homepage', () => {
  test('displays main sections when scrolling', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: /who\?/i })).toBeVisible()

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const footerLinks = page.getByRole('contentinfo').getByRole('link')
    await expect(footerLinks.first()).toBeVisible()
  })
})
