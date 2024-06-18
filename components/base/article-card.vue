<template>
  <NuxtLink :to="`/ramblings/${article.slug.current}`">
    <div :class="$style.card">
      <sanity-image
        :asset-id="article.banner.asset._ref"
        :alt="article.banner.alt"
        w="100"
        h="100"
        fit="crop"
      />
      <div :class="$style.description">
        <h3 :class="$style.title">{{ article.title }}</h3>
        <p>{{ article.excerpt }}</p>
        <sub :class="$style.published">published {{ whatTimeAgo }}</sub>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { formatDistance } from "date-fns";

import type { SanityArticle } from "~/@types/sanity";

interface ArticleProps {
  article: SanityArticle;
}

const { article } = defineProps<ArticleProps>();
const articleReleaseDate =
  article._createdAt === null ? new Date() : new Date(article._createdAt);
const whatTimeAgo = formatDistance(articleReleaseDate, new Date(), {
  addSuffix: true,
});
</script>

<style module>
.card {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  padding: 2rem;
  border-radius: var(--border-radius);
  transition: 0.5s ease-in-out;
  transition-property: background-color;

  &:hover {
    background-color: var(--tertiary-color);
    color: var(--primary-color);
  }
}

.title {
  margin-block-start: 0;
  margin-block-end: 0;
}

.published {
  text-align: right;
}

.description {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: medium;
  justify-content: center;
}
</style>
