import { config } from '@vue/test-utils'
import '@testing-library/jest-dom/vitest'

config.global.mocks = config.global.mocks || {}
config.global.mocks.$style = new Proxy(
  {},
  {
    get(_, name) {
      if (name !== '_isMockFunction') {
        return name
      }
    },
  },
)
