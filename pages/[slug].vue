<template>
  <base-page-section v-if="page">
    <h1>{{ page.title }}</h1>
    <base-sanity-block :blocks="page.content" />
  </base-page-section>
</template>

<script lang="ts" setup>
import type { SanityPage } from '~/@types/sanity'

const route = useRoute()
const { slug } = route.params

const query = groq`*[slug.current == $slug][0]`
const { data: page } = useSanityQuery<SanityPage>(query, { slug })
useSeoMeta({
  description:
    page.value?.excerpt
    ?? 'Leda is a passionate software engineer, whose empathetic and playful approach to problems is sure to find a solution for you.',
  ogImage: '/images/wolf.jpeg',
  ogTitle:
    page.value?.title ?? 'Vuelfden - the Nuxt Edition of Leda Wolf\'s website',
  robots:
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  title: page.value?.title ?? 'Vuelfden',
})
</script>
