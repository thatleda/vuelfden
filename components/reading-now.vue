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
          Reading challenge progress: {{ book.number }} of 100 books completed
        </p>
        <progress :class="$style.progressBar" max="100" :value="book.number" />
      </div>
      <div v-if="book.url" :class="$style.links">
        Find it on
        <link-button
          :to="book.url"
          text="Amazon"
          variant="secondary"
          target="_blank"
        >
          <template #icon><amazon width="1rem" height="1rem" /></template>
        </link-button>
      </div>
    </div>
    <sanity-image
      :alt="book.cover.asset.altText ?? book.title"
      :asset-id="book.cover.asset._ref"
      :class="$style.cover"
      w="300"
    />
  </div>
  <sanity-block :blocks="book.notes" />
</template>

<script lang="ts" setup>
import LinkButton from "~/components/base/link-button.vue";
import SanityBlock from "~/components/base/sanity-block.vue";
import Amazon from "~/components/svg/amazon.vue";

interface ReadingNowProps {
  book: SanityBook;
}

const { book } = defineProps<ReadingNowProps>();
</script>

<style module>
.card {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  gap: 1rem;
  max-width: 1000px;

  @media (max-width: 465px) {
    flex-direction: column;
  }
}

.cover {
  min-width: 180px;
  @media (max-width: 465px) {
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
  @media (max-width: 465px) {
    padding: 0;
  }
}

.progress {
  display: flex;
  flex-direction: column;
}

.progressBar {
  width: 80%;
  @media (max-width: 465px) {
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
