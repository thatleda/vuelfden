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

config.global.stubs = {
  NuxtLink: {
    template: `<a :href="computedHref" :target="computedTarget" :rel="computedRel" v-bind="$attrs"><slot /></a>`,
    props: ['to', 'href', 'target', 'rel', 'external'],
    computed: {
      computedHref() {
        const link = this.to || this.href
        if (!link)
          return '#'

        if (this.external || link.startsWith('http') || link.startsWith('//')) {
          return link
        }

        return link.startsWith('/') ? link : `/${link}`
      },
      computedTarget() {
        if (this.target)
          return this.target

        const link = this.to || this.href
        if (this.external || (link && (link.startsWith('http') || link.startsWith('//')))) {
          return '_blank'
        }

        return undefined
      },
      computedRel() {
        if (this.rel)
          return this.rel

        const link = this.to || this.href
        if (this.external || (link && (link.startsWith('http') || link.startsWith('//')))) {
          return 'noopener noreferrer'
        }

        return undefined
      },
    },
  },
  NuxtImg: {
    template: '<img :src="src" :alt="alt" :width="width" :height="height" :loading="loading" />',
    props: ['src', 'alt', 'width', 'height', 'loading'],
  },
  NuxtPicture: {
    template: '<picture><img :src="src" :alt="alt" /></picture>',
    props: ['src', 'alt'],
  },
  ColorScheme: {
    template: '<div><slot /></div>',
  },
}
