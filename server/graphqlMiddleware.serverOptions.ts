import { defineGraphqlServerOptions } from 'nuxt-graphql-middleware/server-options'

export default defineGraphqlServerOptions({
  serverFetchOptions() {
    const config = useRuntimeConfig()
    return {
      headers: {
        Authorization: config.public.hardcoverApiKey,
      },
    }
  },
})
