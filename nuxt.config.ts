// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/animation.css'],
  devtools: { enabled: true },

  // Performance optimizations for Nuxt 4
  experimental: {
    payloadExtraction: false,
    viewTransition: true,
  },

  // Optimization settings
  optimization: {
    keyedComposables: [
      {
        name: 'useElementVisibility',
        argumentLength: 2,
      },
    ],
  },

  modules: [
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@vueuse/nuxt',
  ],

  // CSS and asset optimization
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/assets/css/animation.css";`,
        },
      },
    },
    build: {
      cssCodeSplit: false,
    },
  },

  nitro: {
    preset: 'netlify',
    prerender: {
      crawlLinks: true,
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/imprint': { prerender: true },
    '/privacy': { prerender: true },
    '/ramblings': { prerender: true },
    '/ramblings/**': { prerender: true },
    '/ramblings/page/**': { prerender: true },
    '/sitemap.xml': { headers: { 'Content-Type': 'application/xml' } },
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

  runtimeConfig: {
    public: {
      sanityProjectId: process.env.NUXT_SANITY_PROJECT_ID || '',
      sanityDataset: process.env.NUXT_SANITY_DATASET || 'production',
    },
  },

  compatibilityDate: '2025-05-28',
})
