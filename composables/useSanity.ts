import type { SanityClient } from '@sanity/client'
import { createClient } from '@sanity/client'
import { computed, ref } from 'vue'

let client: SanityClient | null = null

function getSanityClient(): SanityClient {
  if (!client) {
    const config = useRuntimeConfig()
    client = createClient({
      projectId: config.public.sanityProjectId || '',
      dataset: config.public.sanityDataset || '',
      useCdn: true,
      apiVersion: '2023-01-01',
    })
  }
  return client
}

export function useSanityQuery<T = any>(query: string, params?: any) {
  const data = ref<T | null>(null)
  const pending = ref(true)
  const error = ref<Error | null>(null)

  const execute = async () => {
    try {
      pending.value = true
      error.value = null
      const sanityClient = getSanityClient()
      const result = await sanityClient.fetch<T>(query, params)
      data.value = result
    }
    catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
    }
    finally {
      pending.value = false
    }
  }

  execute()

  return {
    data: computed(() => data.value),
    pending: computed(() => pending.value),
    error: computed(() => error.value),
    refresh: execute,
  }
}

export const sanityClient = () => getSanityClient()
