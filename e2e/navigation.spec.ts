import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
  test('navigates to blog page', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: /blog/i }).click()

    await expect(page).toHaveURL(/\/ramblings/)

    await expect(page.getByRole('heading', { name: /unhinged ramblings/i })).toBeVisible()
  })
})
