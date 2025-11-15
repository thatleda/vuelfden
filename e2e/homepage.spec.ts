import { expect, test } from '@playwright/test'

test('displays navigation with home link', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByLabel('Main navigation')).toBeVisible()
  await expect(page.getByLabel('Main navigation').getByRole('link', { name: 'Howling wolf icon' })).toBeVisible()
  await expect(page.getByLabel('Main navigation').getByRole('link', { name: 'Who?' })).toBeVisible()
  await expect(page.getByLabel('Main navigation').getByRole('link', { name: 'Blog' })).toBeVisible()
  await expect(page.getByLabel('Main navigation').getByRole('link', { name: 'Working with Leda' })).toBeVisible()
  await expect(page.getByLabel('Main navigation').getByRole('link', { name: 'Contact' })).toBeVisible()
  await expect(page.getByLabel('Main navigation').getByRole('link', { name: 'CV' })).toBeVisible()
})

test('displays top images of Leda', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByLabel('Leda Wolf\'s portrait, wearing a black shirt with her chin firmly up')).toBeVisible()
  await expect(page.getByLabel('Leda Wolf with a wide smile on her face')).toBeVisible()
})

test('displays social links', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByLabel('Discord')).toHaveAttribute('href', 'https://discord.com/users/732667625255075951')
  await expect(page.getByLabel('GitHub')).toHaveAttribute('href', 'https://github.com/thatleda')
  await expect(page.getByLabel('LinkedIn')).toHaveAttribute('href', 'https://www.linkedin.com/in/thatleda/')
  await expect(page.getByLabel('Mail')).toHaveAttribute('href', 'mailto:leda@hey.com')
  await expect(page.getByLabel('Calendly')).toHaveAttribute('href', 'https://calendly.com/ledawolf/meeting')
})

test('displays who section', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Who?' })).toBeVisible()
  await expect(page.getByText(/Canis Ledus/i)).toBeVisible()
})

test('displays reviews section', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Reviews' })).toBeVisible()
  await expect(page.getByLabel('Karan Hudia\'s portrait')).toBeVisible()
  await expect(page.getByLabel('Aira Wolf z Tuřanského dvora\'s portrait')).toBeVisible()
  await expect(page.getByLabel('Marta Gilabert Guzman\'s portrait')).toBeVisible()
})

test('displays reading section', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: /What is she up to?/i })).toBeVisible()
  await expect(page.getByText(/reading challenge/i)).toBeVisible()
})
