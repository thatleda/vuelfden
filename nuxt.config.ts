// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css", "~/assets/css/animation.css"],
  devtools: { enabled: true },
  modules: ["@nuxtjs/sanity", "@nuxt/eslint", "@vueuse/nuxt", "@nuxt/fonts"],
  routeRules: {
    "/": { prerender: true },
  },
  sanity: {
    dataset: process.env.NUXT_SANITY_DATASET,
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
  },
});
