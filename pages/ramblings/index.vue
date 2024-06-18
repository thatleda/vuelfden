<template>
  <page-section heading="Unhinged ramblings">
    <div :class="$style.articles">
      <article-card
        v-for="article in articles"
        :key="article._id"
        :article="article"
      />
    </div>
  </page-section>
</template>

<script lang="ts" setup>
import type { SanityArticle } from "~/@types/sanity";

import ArticleCard from "~/components/base/article-card.vue";
import PageSection from "~/components/base/page-section.vue";

const query = groq`*[_type == "article"] | order(_createdAt desc)[0..10]`;
const { data: articles } = useSanityQuery<SanityArticle[]>(query);
</script>

<style module>
.articles {
  display: grid;
  grid-row-gap: 1rem;
}
</style>
