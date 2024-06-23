<template>
  <base-page-section v-if="article">
    <h1>{{ article.title }}</h1>
    <sanity-image
      v-if="article.banner"
      :alt="article.banner.alt"
      :asset-id="article.banner.asset._ref"
      w="750"
      h="300"
      fit="crop"
      crop="center"
      :class="$style.banner"
      crossorigin
    />
    <base-sanity-block :blocks="article.content" />
  </base-page-section>
</template>

<script lang="ts" setup>
import type { SanityArticle } from '~/@types/sanity'

const route = useRoute()
const { slug } = route.params

const query = groq`*[slug.current == $slug][0]`
const { data: article } = useSanityQuery<SanityArticle>(query, { slug })
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
})
</script>

<style module>
.banner {
  margin: 0 auto;
  display: flex;
  max-width: 80vw;
}
</style>
