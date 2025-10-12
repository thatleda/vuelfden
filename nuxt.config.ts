import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: ['~/assets/css/animation.css'],
  devtools: { enabled: true },

  experimental: {
    payloadExtraction: false,
    viewTransition: true,
  },

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
    'nuxt-graphql-middleware',
  ],

  graphqlMiddleware: {
    graphqlEndpoint: 'https://api.hardcover.app/v1/graphql',
    codegenSchemaConfig: {
      urlSchemaOptions: {
        headers: {
          Authorization: process.env.NUXT_HARDCOVER_API_KEY || '',
        },
      },
    },
  },

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
    '/': { isr: 2 * 60 * 60 },
    '/imprint': { prerender: true },
    '/privacy': { prerender: true },
    '/ramblings': { isr: 2 * 60 * 60 },
    '/ramblings/**': { prerender: true },
    '/ramblings/page/**': { isr: 24 * 60 * 60 },
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

  runtimeConfig: {
    public: {
      sanityProjectId: process.env.NUXT_SANITY_PROJECT_ID || '',
      sanityDataset: process.env.NUXT_SANITY_DATASET || 'production',
    },
    hardcoverApiKey: process.env.NUXT_HARDCOVER_API_KEY || '',
  },

  compatibilityDate: '2025-05-28',
})
