<template>
  <base-page-section v-if="article">
    <h1>{{ article.title }}</h1>
    <NuxtImg
      v-if="article.banner"
      :alt="article.banner.altText"
      :src="article.banner._id"
      width="750"
      :class="$style.banner"
      loading="lazy"
    />
    <base-sanity-block :blocks="article.content" />
  </base-page-section>
</template>

<script lang="ts" setup>
import type { SanityPage } from '~/@types/sanity'
import groq from 'groq'

const route = useRoute()
const { slug } = route.params

const query = groq`*[slug.current == $slug][0]{
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
const { data: article } = useSanityQuery<SanityPage>(query, { slug })
useSeoMeta({
  description:
    article.value?.excerpt
    || 'Leda is a passionate software engineer, whose empathetic and playful approach to problems is sure to find a solution for you.',
  ogImage: '/images/wolf.jpeg',
  ogTitle:
    article.value?.title
    ?? 'Vuelfden - the Nuxt Edition of Leda Wolf\'s website',
  robots:
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  title: article.value?.title ?? 'Vuelfden',
  articleModifiedTime: article.value?._updatedAt,
  articlePublishedTime: article.value?._createdAt,
})
</script>

<style module>
.banner {
  margin: 0 auto;
  display: flex;
  max-width: 80vw;
}
</style>
