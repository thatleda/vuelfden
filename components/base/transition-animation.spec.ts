import { render, screen } from '@testing-library/vue'
import { beforeEach, expect, it, vi } from 'vitest'

import TransitionAnimation from '~/components/base/transition-animation.vue'

const { useElementVisibility } = vi.hoisted(() => {
  return {
    useElementVisibility: vi.fn().mockImplementation(() => {
      return { value: false }
    }),
  }
})

vi.mock('@vueuse/core', () => {
  return { useElementVisibility }
})

beforeEach(() => {
  useElementVisibility.mockRestore()
})

it('should be invisible', async () => {
  render(TransitionAnimation, {
    props: {
      animationDuration: '1s',
      animationName: 'scale-in',
    },

    slots: {
      default: () => 'BIG ASS TARGET',
    },
  })

  expect(screen.getByText('BIG ASS TARGET')).toHaveStyle('opacity: 0')
})

it('should be visible', async () => {
  useElementVisibility.mockImplementation(() => {
    return { value: true }
  })

  render(TransitionAnimation, {
    props: {
      animationDuration: '0s',
      animationName: 'scale-in',
    },

    slots: {
      default: () => 'BIG ASS TARGET',
    },
  })

  expect(screen.getByText('BIG ASS TARGET')).toHaveStyle({
    'animation-duration': '0s',
    'animation-fill-mode': 'backwards',
    'animation-name': 'scale-in',
  })
})
