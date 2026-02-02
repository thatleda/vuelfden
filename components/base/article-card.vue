<template>
  <NuxtLink :to="`/ramblings/${article.slug.current}`">
    <div :class="$style.card" data-testid="article-card">
      <NuxtImg
        :src="article.banner._id"
        :alt="article.banner.altText"
        width="100"
        loading="lazy"
      />
      <div :class="$style.description" data-testid="article-description">
        <h3 :class="$style.title">
          {{ article.title }}
        </h3>
        <p>{{ article.excerpt }}</p>
        <sub :class="$style.published">published {{ howLong }} ago</sub>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { SanityPage } from '~/@types/sanity'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const { article } = defineProps<ArticleProps>()

dayjs.extend(relativeTime)

interface ArticleProps {
  article: SanityPage
}

const articleReleaseDate
  = article._createdAt === null ? new Date() : new Date(article._createdAt)

const howLong = dayjs(articleReleaseDate).toNow(true)
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
  color: var(--text-color);

  &:hover {
    background-color: var(--tertiary-color);
    color: var(--background-color);
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
  justify-content: center;
}
</style>
