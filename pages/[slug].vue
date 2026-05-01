<script lang="ts" setup>
import type { SanityPage } from '~/@types/sanity'
import groq from 'groq'

const route = useRoute()
const { slug } = route.params
const { lang } = useLanguage()

const query = groq`*[_type == "page" && slug.current == $slug && language == $lang][0]{
  _createdAt,
  _updatedAt,
  _id,
  content,
  excerpt,
  slug,
  title,
  "banner": banner.asset->{
    _id,
    _type,
    altText
  }
}`
const params = computed(() => ({ slug, lang: lang.value }))
const { data: page } = useSanityQuery<SanityPage>(query, params)
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

<template>
  <base-page-section v-if="page">
    <h1>{{ page.title }}</h1>
    <base-sanity-block :blocks="page.content" />
  </base-page-section>
</template>
