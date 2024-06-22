import { render } from '@testing-library/vue'
import { it } from 'vitest'

import Blockquote from '~/components/base/blockquote.vue'

it('should add styling', () => {
  render(Blockquote)
})
