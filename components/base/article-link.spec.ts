// @vitest-environment nuxt
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import { expect, it } from 'vitest'

import ArticleLink from '~/components/base/article-link.vue'

it('should add target and rel properties, styling', async () => {
  await renderSuspended(ArticleLink, { props: { href: 'https://google.com' } })

  expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
  expect(screen.getByRole('link')).toHaveAttribute(
    'href',
    'https://google.com',
  )
  expect(screen.getByRole('link')).toHaveClass('link')
})

it('should add / for internal links', async () => {
  await renderSuspended(ArticleLink, { props: { href: 'resume.pdf' } })

  expect(screen.getByRole('link')).toHaveAttribute('href', '/resume.pdf')
})

it('should pass text through slot', async () => {
  await renderSuspended(ArticleLink, {
    props: { href: 'resume.pdf' },
    slots: { default: () => `I'm telling you softly where to go.` },
  })

  expect(
    screen.getByText('I\'m telling you softly where to go.'),
  ).toBeInTheDocument()
})
