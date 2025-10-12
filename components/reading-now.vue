<template>
  <div :class="$style.card">
    <div :class="$style.description">
      Probably reading
      <b :class="$style.title"> {{ book.title }} ({{ book.release }})</b>
      <sub :class="$style.author">
        by <em>{{ book.author }}</em>
      </sub>
      <div v-if="challenge" :class="$style.progress">
        <p>
          {{ challenge.description }}: {{ challenge.progress }} of {{ challenge.goal }} books completed
        </p>
        <progress :class="$style.progressBar" :max="challenge.goal" :value="challenge.progress" />
      </div>
    </div>
    <img
      :alt="`The book cover of ${book.title} by ${book.author}`"
      :src="book.cover || '/images/book-cover-placeholder.png'"
      :class="$style.cover"
      loading="lazy"
      width="300"
    >
  </div>
</template>

<script lang="ts" setup>
const { data } = await useGraphqlQuery('reading')

const challenge = computed(() => data.me[0]?.goals[0])

const book = computed(() => {
  const userBook = data.me[0]?.goals[0]?.user.user_books[0]
  return {
    title: userBook?.book.title ?? 'Unknown Title',
    author: userBook?.book.contributions[0]?.author?.name ?? 'Unknown Author',
    cover: userBook?.book.image?.url,
    release: userBook?.book.release_year ?? 'year unknown',
  }
})
</script>

<style module>
.card {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  gap: 1rem;

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
