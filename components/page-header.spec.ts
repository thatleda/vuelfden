import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { expect, it } from 'vitest'
import PageHeader from '~/components/page-header.vue'

it('opens the mobile sidebar menu on burger click', async () => {
  render(PageHeader)

  await userEvent.click(screen.getByRole('button', { name: 'Open menu' }))

  expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument()
})

it('is hidden from assistive tech until opened', () => {
  render(PageHeader)

  expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument()
})

it('closes the sidebar when a mobile nav link is clicked', async () => {
  render(PageHeader)

  await userEvent.click(screen.getByRole('button', { name: 'Open menu' }))
  await userEvent.click(screen.getByRole('link', { name: 'Who?' }))

  expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument()
})

it('switches the active language button on click', async () => {
  render(PageHeader)

  const german = screen.getByRole('button', { name: 'Language German' })
  await userEvent.click(german)

  expect(german).toHaveClass('langButtonActive')
})
