import type { SanityPage } from '~/@types/sanity'
import { render, screen } from '@testing-library/vue'
import { formatDistance } from 'date-fns'
import { expect, it, vi } from 'vitest'
import ArticleCard from '~/components/base/article-card.vue'

vi.mock('date-fns', () => ({
  formatDistance: vi.fn(() => '2 days ago'),
}))

const article: SanityPage = {
  _id: 'test-article-id',
  _createdAt: '2023-01-01T00:00:00.000Z',
  _updatedAt: '2023-01-01T00:00:00.000Z',
  banner: {
    _id: 'test-banner-id',
    _type: 'sanity.imageAsset',
    altText: 'Test article banner image',
  },
  content: [],
  excerpt: 'This is a test article excerpt that describes the content.',
  slug: {
    _type: 'slug',
    current: 'test-article-slug',
  },
  title: 'Test Article Title',
}

it('should display the article as a clickable card linking to the article page', () => {
  render(ArticleCard, {
    props: { article },
  })

  expect(screen.getByRole('link')).toHaveAttribute('href', '/ramblings/test-article-slug')
})

it('should display the article banner image with proper attributes', () => {
  render(ArticleCard, {
    props: { article },
  })

  const image = screen.getByRole('img')
  expect(image).toHaveAttribute('alt', 'Test article banner image')
  expect(image).toHaveAttribute('width', '100')
  expect(image).toHaveAttribute('loading', 'lazy')
})

it('should display the article title as a heading', () => {
  render(ArticleCard, {
    props: { article },
  })

  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Article Title')
})

it('should display the article excerpt as descriptive text', () => {
  render(ArticleCard, {
    props: { article },
  })

  expect(screen.getByText('This is a test article excerpt that describes the content.')).toBeInTheDocument()
})

it('should display the publication date in a human-readable format', () => {
  render(ArticleCard, {
    props: { article },
  })

  expect(screen.getByText('published 2 days ago')).toBeInTheDocument()
  expect(formatDistance).toHaveBeenCalledWith(
    new Date('2023-01-01T00:00:00.000Z'),
    expect.any(Date),
    { addSuffix: true },
  )
})

it('should handle null creation date by using current date', () => {
  const articleWithNullDate = {
    ...article,
    _createdAt: null as any,
  }

  render(ArticleCard, {
    props: { article: articleWithNullDate },
  })

  expect(screen.getByText('published 2 days ago')).toBeInTheDocument()
  expect(formatDistance).toHaveBeenCalledWith(
    expect.any(Date),
    expect.any(Date),
    { addSuffix: true },
  )
})

it('should render with proper CSS module classes for card layout', () => {
  render(ArticleCard, {
    props: { article },
  })

  expect((screen.getByRole('link')).querySelector('div')).toHaveClass('card')
})

it('should apply title styling to the heading element', () => {
  render(ArticleCard, {
    props: { article },
  })

  expect(screen.getByRole('heading', { level: 3 })).toHaveClass('title')
})

it('should apply published date styling to the time element', () => {
  render(ArticleCard, {
    props: { article },
  })

  expect((screen.getByText('published 2 days ago')).tagName).toBe('SUB')
  expect(screen.getByText('published 2 days ago')).toHaveClass('published')
})

it('should wrap content in a description container with proper styling', () => {
  render(ArticleCard, {
    props: { article },
  })

  expect((screen.getByRole('heading', { level: 3 })).parentElement).toHaveClass('description')
})

it('should provide a meaningful link containing full article card content for screen readers', () => {
  render(ArticleCard, {
    props: { article },
  })

  expect(screen.getByRole('link')).toContainElement(screen.getByRole('heading', { level: 3 }))
  expect(screen.getByRole('link')).toContainElement(screen.getByRole('img'))
})
