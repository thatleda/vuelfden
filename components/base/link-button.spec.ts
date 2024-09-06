// @vitest-environment nuxt

import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import { expect, it } from 'vitest'

import LinkButton from '~/components/base/link-button.vue'
import GitHub from '~/components/svg/github.vue'

it('should render external link as a button', async () => {
  await renderSuspended(LinkButton, {
    props: {
      to: 'https://google.com',
    },
    slots: {
      default: () => 'Google it!',
    },
  })

  expect(screen.getByRole('link')).toHaveAccessibleName('Google it!')
  expect(screen.getByRole('link')).toHaveAttribute(
    'rel',
    'noopener noreferrer',
  )
  expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
  expect(screen.getByRole('link')).toHaveClass('button')
})

it('should pass an svg', async () => {
  await renderSuspended(LinkButton, {
    props: {
      to: 'https://github.com',
    },
    slots: {
      default: GitHub,
    },
  })

  expect(screen.getByTitle('GitHub icon')).toBeInTheDocument()
})

it('should add the right class to the primary button', async () => {
  await renderSuspended(LinkButton, {
    props: {
      target: '_blank',
      to: 'https://google.com',
      variant: 'primary',
    },
    slots: {
      default: () => 'Google it!',
    },
  })

  expect(screen.getByRole('link')).toHaveClass('button', 'primary')
})

it('should add the right class to the secondary button', async () => {
  await renderSuspended(LinkButton, {
    props: {
      to: 'https://google.com',
      variant: 'secondary',
    },
    slots: {
      default: () => 'Google it!',
    },
  })

  expect(screen.getByRole('link')).toHaveClass('button', 'secondary')
})

it('should add the custom class', async () => {
  await renderSuspended(LinkButton, {
    props: {
      class: 'customClass',
      to: 'https://google.com',
      variant: 'secondary',
    },
    slots: {
      default: () => 'Google it!',
    },
  })

  expect(screen.getByRole('link')).toHaveClass(
    'button',
    'secondary',
    'customClass',
  )
})
