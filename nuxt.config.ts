// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/animation.css'],
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxtjs/sanity',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxt/test-utils/module',
    '@nuxtjs/sitemap',
    [
      '@nuxtjs/robots',
      {
        rules: {
          BlankLine: true,
          Comment: 'Come hither, little bots.',
          Disallow: '',
          UserAgent: '*',
        },
      },
    ],
  ],
  routeRules: {
    '/': { swr: true },
    '/imprint': { prerender: true },
    '/privacy': { prerender: true },
    '/ramblings': { swr: true },
    '/ramblings/**': { prerender: true },
  },
  sanity: {
    dataset: process.env.NUXT_SANITY_DATASET,
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
  },
  site: {
    name: 'Vuelfden',
    url: process.env.URL,
  },
})
