import { within } from '@testing-library/vue'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, expect, it } from 'vitest'
import ReadingNow from '~/components/reading-now.vue'
import { renderSuspended } from '../tests/render-suspended'

function mockReading(overrides: {
  userBooks?: unknown[]
  reviews?: unknown[]
}) {
  return http.get('/api/graphql_middleware/query/reading', () => {
    return HttpResponse.json({
      data: {
        me: [{
          goals: [{
            progress: 40,
            description: '2026 reading challenge',
            goal: 200,
            user: {
              user_books: overrides.userBooks ?? [],
              reviews: overrides.reviews ?? [],
            },
          }],
        }],
      },
    })
  })
}

const server = setupServer()

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('shows the current book once the reading data resolves', async () => {
  server.use(mockReading({
    userBooks: [{
      book: {
        title: 'The Stainless Steel Rat',
        release_year: 1961,
        image: { url: 'https://example.com/stainless-steel-rat.jpg' },
        contributions: [{ author: { name: 'Harry Harrison' } }],
      },
    }],
  }))

  const { container } = await renderSuspended(ReadingNow)
  const screen = within(container)

  expect(screen.queryByRole('status')).not.toBeInTheDocument()

  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('The Stainless Steel Rat (1961)')
  expect(screen.getByText('Harry Harrison')).toBeInTheDocument()

  const cover = screen.getByRole('img', { name: 'The book cover of The Stainless Steel Rat by Harry Harrison' })
  expect(cover).toHaveAttribute('srcset', 'https://example.com/stainless-steel-rat.jpg')

  const progress = screen.getByRole('progressbar')
  expect(progress).toHaveAttribute('max', '200')
  expect(progress).toHaveAttribute('value', '40')
  expect(screen.getByText(/2026 reading challenge/)).toBeInTheDocument()

  expect(screen.queryByText(/finished/i)).not.toBeInTheDocument()
})

it('shows a fallback when nobody is currently reading anything', async () => {
  server.use(mockReading({}))

  const { container } = await renderSuspended(ReadingNow)
  const screen = within(container)

  expect(screen.getByText('Not reading anything at the moment')).toBeInTheDocument()
  expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument()
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
})

it('shows the latest finished review when one exists', async () => {
  server.use(mockReading({
    reviews: [{
      rating: 4,
      review_slate: null,
      book: {
        title: 'Make Room! Make Room!',
        release_year: 1966,
        image: { url: 'https://example.com/make-room.jpg' },
        contributions: [{ author: { name: 'Harry Harrison' } }],
      },
    }],
  }))

  const { container } = await renderSuspended(ReadingNow)
  const screen = within(container)

  expect(screen.getByText('Just finished reading')).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Make Room! Make Room! (1966)')
  expect(screen.getByText(/Rating/)).toHaveTextContent('Rating: 4 / 5 stars')

  expect(screen.getByText('Not reading anything at the moment')).toBeInTheDocument()
})
