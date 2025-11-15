import { expect, test } from '@playwright/test'

test('navigates to blog page', async ({ page }) => {
  await page.goto('/')

  await page.getByLabel('Main navigation').getByRole('link', { name: 'Blog' }).click()

  await expect(page).toHaveURL(/\/ramblings/)

  await expect(page.getByRole('heading', { name: 'Unhinged ramblings' })).toBeVisible()
  await expect(page.getByLabel('Blog articles')).toBeVisible()
  await expect(page.getByLabel('Go to next page, page 2')).toBeVisible()
})

test('displays navigation with home link', async ({ page }) => {
  await page.goto('/ramblings')

  await expect(page.getByLabel('Main navigation')).toBeVisible()
  await expect(page.getByLabel('Main navigation').getByRole('link', { name: 'Howling wolf icon' })).toBeVisible()
  await expect(page.getByLabel('Main navigation').getByRole('link', { name: 'Who?' })).toBeVisible()
  await expect(page.getByLabel('Main navigation').getByRole('link', { name: 'Blog' })).toBeVisible()
  await expect(page.getByLabel('Main navigation').getByRole('link', { name: 'Working with Leda' })).toBeVisible()
  await expect(page.getByLabel('Main navigation').getByRole('link', { name: 'Contact' })).toBeVisible()
  await expect(page.getByLabel('Main navigation').getByRole('link', { name: 'CV' })).toBeVisible()
})
