import { defineGraphqlServerOptions } from 'nuxt-graphql-middleware/server-options'

export default defineGraphqlServerOptions({
  // @ts-expect-error because leave me alone, I am hardcoding it on the server for security reasons
  serverFetchOptions() {
    return {
      headers: {
        Authorization: process.env.NUXT_HARDCOVER_API_KEY,
      },
    }
  },
})
