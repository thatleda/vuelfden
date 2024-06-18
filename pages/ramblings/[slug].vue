<template>
  <page-section v-if="article">
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
    />
    <sanity-block :blocks="article.content"></sanity-block>
  </page-section>
</template>

<script lang="ts" setup>
import type { SanityArticle } from "~/@types/sanity";

import PageSection from "~/components/base/page-section.vue";
import SanityBlock from "~/components/base/sanity-block.vue";

const route = useRoute();
const { slug } = route.params;

const query = groq`*[slug.current == $slug][0]`;
const { data: article } = useSanityQuery<SanityArticle>(query, { slug });
</script>

<style module>
.banner {
  margin: 0 auto;
  display: flex;
  max-height: 50vh;
}
</style>
