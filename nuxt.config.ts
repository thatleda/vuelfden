// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/animation.css'],
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxtjs/sanity',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/test-utils/module',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },

  routeRules: {
    '/': { swr: true },
    '/imprint': { prerender: true },
    '/privacy': { prerender: true },
    '/ramblings': { swr: true },
    '/ramblings/**': { prerender: true },
    '/sitemap.xml': { prerender: true },
  },

  sanity: {
    dataset: process.env.NUXT_SANITY_DATASET,
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
  },

  image: {
    provider: 'sanity',
    sanity: {
      baseURL: 'https://cdn.sanity.io/',
      projectId: process.env.NUXT_SANITY_PROJECT_ID,
      modifiers: {
        fit: 'cover',
        crop: 'center',
      },
    },
    alias: {
      domain: 'https://cdn.sanity.io',
    },
  },

  site: {
    name: 'Vuelfden',
    url: process.env.NETLIFY_URL,
  },

  compatibilityDate: '2024-07-11',
})
