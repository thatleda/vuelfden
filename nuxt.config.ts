// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/animation.css"],
  devtools: { enabled: true },
  image: {
    dir: "assets/images",
  },
  modules: [
    "@nuxt/fonts",
    "@nuxtjs/sanity",
    "@nuxtjs/color-mode",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxt/test-utils/module",
    "@nuxtjs/sitemap",
    [
      "@nuxtjs/robots",
      {
        rules: {
          BlankLine: true,
          Comment: "Come hither, little bots.",
          Disallow: "",
          UserAgent: "*",
        },
      },
    ],
  ],
  routeRules: {
    "/": { prerender: true },
    "/imprint": { prerender: true },
    "/privacy": { prerender: true },
    // cache for a week
    "/ramblings": { cache: { maxAge: 60 * 60 * 24 * 7 } },
    // cache articles for a month
    "/ramblings/*": { cache: { maxAge: 60 * 60 * 24 * 30 } },
  },
  sanity: {
    dataset: process.env.NUXT_SANITY_DATASET,
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
  },
  site: {
    name: "Vuelfden",
  },
});
