import { config } from '@vue/test-utils'
import { ofetch } from 'ofetch'
import { vi } from 'vitest'
import { ref } from 'vue'
import BaseLinkButton from '~/components/base/link-button.vue'
import { translations } from '~/composables/useTranslations'
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

config.global.components = config.global.components || {}
config.global.components['base-link-button'] = BaseLinkButton

function useTranslations() {
  const locale = ref('en')

  return {
    t: (key: string) => {
      const currentLocale = locale.value as 'de' | 'en'
      const exists = (translations[currentLocale] as Record<string, unknown>)[key] !== undefined
      if (!exists) {
        console.warn(`Missing i18n key: ${key}`)
        return key
      }
      return (translations[currentLocale] as Record<string, unknown>)[key]
    },
  }
}

function createMemoryStorage(): Storage {
  const store = new Map<string, string>()

  return {
    getItem: key => store.get(key) ?? null,
    setItem: (key, value) => { store.set(key, value) },
    removeItem: (key) => { store.delete(key) },
    clear: () => store.clear(),
    key: index => Array.from(store.keys())[index] ?? null,
    get length() { return store.size },
  }
}

vi.stubGlobal('localStorage', createMemoryStorage())

vi.stubGlobal('useTranslations', useTranslations)
vi.stubGlobal('useLanguage', () => ({ lang: ref('en') }))
vi.stubGlobal('useMediaQuery', () => ref(true))

vi.stubGlobal('$fetch', ofetch)

vi.stubGlobal('useAsyncData', (_key: string, handler: () => Promise<unknown>) => {
  const data = ref<unknown>(null)
  const pending = ref(true)
  const error = ref<unknown>(null)

  handler()
    .then((result) => {
      data.value = result
    })
    .catch((caught) => {
      error.value = caught
    })
    .finally(() => {
      pending.value = false
    })

  return { data, pending, error }
})
