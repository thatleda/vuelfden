import { expect, test } from '@playwright/test'

test('displays navigation with home link', async ({ page }) => {
  await page.goto('/')

  await page.getByLabel('Language German').click()

  await expect(page.getByLabel('Hauptmenü')).toBeVisible()
  await expect(page.getByLabel('Hauptmenü').getByRole('button', { name: 'Sprache Deutsch' })).toBeVisible()
  await expect(page.getByLabel('Hauptmenü').getByRole('button', { name: 'Farbmodus umschalten' })).toBeVisible()
  await expect(page.getByLabel('Hauptmenü').getByRole('link', { name: 'Wer?' })).toBeVisible()
  await expect(page.getByLabel('Hauptmenü').getByRole('link', { name: 'Bisher' })).toBeVisible()
  await expect(page.getByLabel('Hauptmenü').getByRole('link', { name: 'Blog' })).toBeVisible()
  await expect(page.getByLabel('Hauptmenü').getByRole('link', { name: 'Mit Leda arbeiten' })).toBeVisible()
  await expect(page.getByLabel('Hauptmenü').getByRole('link', { name: 'Kontakt' })).toBeVisible()
  await expect(page.getByLabel('Hauptmenü').getByRole('link', { name: 'Lebenslauf' })).toBeVisible()
})

test('displays reading section', async ({ page }) => {
  await page.goto('/')

  await page.getByLabel('Language German').click()

  await expect(page.getByRole('heading', { name: 'Was macht sie gerade?' })).toBeVisible()
  await expect(page.getByText('Lese-Challenge')).toBeVisible()
  await expect(page.getByText('von 100 Büchern durchgelesen')).toBeVisible()
  await expect(page.getByText('Gerade gelesen')).toBeVisible()
  await expect(page.getByText('Bewertung:')).toBeVisible()
})

test('displays the CV in German', async ({ page }) => {
  await page.goto('/resume')

  await page.getByLabel('Language German').click()

  await expect(page.getByRole('link', { name: 'Drucken / Als PDF speichern' })).toBeVisible()
  await expect(page.getByText('SENIOR FULLSTACK SOFTWAREENTWICKLERIN')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Profil' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Kenntnisse' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Berufserfahrung' })).toBeVisible()
  await expect(page.getByText('DIU MarTech Solutions')).toBeVisible()
  await expect(page.getByText('Verlag C.H.Beck')).toBeVisible()
  await expect(page.getByText('Bewerbungsphase')).toBeVisible()
  await expect(page.getByText('grover.com')).toBeVisible()
  await expect(page.getByText('Tallence AG')).toBeVisible()
  await expect(page.getByText('sum.cumo Sapiens GmbH')).toBeVisible()
  await expect(page.getByText('moebel.de')).toBeVisible()
  await expect(page.getByText('EOS Technology Solutions')).toBeVisible()
  await expect(page.getByText('CarGarantie')).toBeVisible()
  await expect(page.getByText('DrehPunkt GmbH')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Ausbildung' })).toBeVisible()
  await expect(page.getByText('Universität Rostock')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Sprachen' })).toBeVisible()
  await expect(page.getByText('Deutsch, Englisch, Russisch')).toBeVisible()
  await expect(page.getByText('Spanisch, Französisch')).toBeVisible()
  await expect(page.getByText('Ukrainisch, Portugiesisch, Mandarin, Japanisch')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Weiteres' })).toBeVisible()
  await expect(page.getByText('Zertifizierter Scrum Master')).toBeVisible()
})
