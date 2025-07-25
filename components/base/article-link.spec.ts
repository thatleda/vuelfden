import type { ArticleLinkProps } from '~/components/base/article-link.vue'
import { render, screen } from '@testing-library/vue'

import { expect, it } from 'vitest'
import ArticleLink from '~/components/base/article-link.vue'

it('should add target and rel properties, styling', async () => {
  render(ArticleLink, { props: { href: 'https://google.com' } as ArticleLinkProps })

  expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
  expect(screen.getByRole('link')).toHaveAttribute(
    'href',
    'https://google.com',
  )
  expect(screen.getByRole('link')).toHaveClass('link')
})

it('should add / for internal links', async () => {
  render(ArticleLink, { props: { href: 'resume.pdf' } as ArticleLinkProps })

  expect(screen.getByRole('link')).toHaveAttribute('href', '/resume.pdf')
})

it('should pass text through slot', async () => {
  render(ArticleLink, {
    props: { href: 'resume.pdf' } as ArticleLinkProps,
    slots: { default: () => `I'm telling you softly where to go.` },
  })

  expect(
    screen.getByText('I\'m telling you softly where to go.'),
  ).toBeInTheDocument()
})
