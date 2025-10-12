import type { SanityClient } from '@sanity/client'
import type { MaybeRef } from '@vueuse/core'
import type { SanityPage, SanityReview } from '~/@types/sanity'
import { createClient } from '@sanity/client'

import { computed, ref, unref, watch } from 'vue'

export type SanityDocument = SanityPage | SanityReview

let client: SanityClient | null = null

function getSanityClient(): SanityClient {
  const config = useRuntimeConfig()
  if (!client) {
    client = createClient({
      projectId: config.public.sanityProjectId || '',
      dataset: config.public.sanityDataset || '',
      useCdn: true,
      apiVersion: '2023-01-01',
    })
  }
  return client
}

export function useSanityQuery<T = SanityDocument>(
  query: MaybeRef<string>,
  params?: MaybeRef<Record<string, any>>,
  options?: {
    initialData?: T | null
    enabled?: MaybeRef<boolean>
    server?: boolean
  },
) {
  const data = ref<T | null>(options?.initialData ?? null)
  const pending = ref(false)
  const error = ref<Error | null>(null)

  const execute = async () => {
    const enabled = unref(options?.enabled ?? true)
    if (!enabled)
      return

    try {
      pending.value = true
      error.value = null
      const sanityClient = getSanityClient()
      const queryValue = unref(query)
      const paramsValue = unref(params) || {}

      const result = await sanityClient.fetch<T>(queryValue, paramsValue)
      data.value = result
    }
    catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      console.error('Sanity query error:', err)
    }
    finally {
      pending.value = false
    }
  }

  watch(
    [() => unref(query), () => unref(params), () => unref(options?.enabled ?? true)],
    execute,
    { immediate: true },
  )

  return {
    data: computed(() => data.value),
    pending: computed(() => pending.value),
    error: computed(() => error.value),
    refresh: execute,
  }
}

export const sanityClient = () => getSanityClient()
