<template>
  <div :class="$style.card">
    <div :class="$style.description">
      Probably reading
      <b :class="$style.title"> {{ book.title }}</b>
      <sub :class="$style.author">
        by <em>{{ book.author }}</em>
      </sub>
      <div v-if="book.number" :class="$style.progress">
        <p>
          This year's challenge: {{ book.number }} of 80 books completed
        </p>
        <progress :class="$style.progressBar" max="80" :value="book.number" />
      </div>
      <div v-if="book.url" :class="$style.links">
        Find it on
        <base-link-button
          :to="book.url"
          variant="secondary"
          target="_blank"
        >
          <svg-amazon width="1rem" height="1rem" />Amazon
        </base-link-button>
      </div>
    </div>
    <NuxtImg
      :alt="book.cover.altText ?? book.title"
      :src="book.cover._id"
      :class="$style.cover"
      loading="lazy"
      width="300"
    />
  </div>
  <base-sanity-block :blocks="book.notes" />
</template>

<script lang="ts" setup>
import type { SanityBook } from '~/@types/sanity'

interface ReadingNowProps {
  book: SanityBook
}

const { book } = defineProps<ReadingNowProps>()
</script>

<style module>
.card {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  gap: 1rem;
  max-width: 1000px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
}

.cover {
  min-width: 180px;
  @media (max-width: 600px) {
    margin: 0 auto;
  }
}

.description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 1rem;
  padding-left: 1rem;
  @media (max-width: 600px) {
    padding: 0;
  }
}

.progress {
  display: flex;
  flex-direction: column;
}

.progressBar {
  width: 80%;
  @media (max-width: 600px) {
    width: 100%;
  }
}

.title {
  text-decoration: underline;
  font-size: 1.2rem;
}

.author {
  padding-top: 0.5rem;
}

.links {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1rem;
}
</style>
