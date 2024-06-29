<template>
  <base-page-section heading="Unhinged ramblings">
    <work-playlist />
    <div :class="$style.articles">
      <base-article-card
        v-for="article in articles"
        :key="article._id"
        :article="article"
      />
    </div>
  </base-page-section>
</template>

<script lang="ts" setup>
import type { SanityArticle } from '~/@types/sanity'

const query = groq`*[_type == "article"] | order(_createdAt desc)[0..10]`
const { data: articles } = useSanityQuery<SanityArticle[]>(query)

useSeoMeta({
  description:
    'You have reached the coveted index of Leda Wolf\'s select wisdom nuggets. Good for you!',
  ogImage: '/images/wolf.jpeg',
  ogTitle: 'Ramblings',
  robots:
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  title: 'Ramblings',
})
</script>

<style module>
.articles {
  display: grid;
  grid-row-gap: 1rem;
}
</style>
