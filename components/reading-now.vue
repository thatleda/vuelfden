<template>
  <div>
    <img
      :alt="`The book cover of ${book.title} by ${book.author}`"
      :src="book.cover || '/images/book-cover-placeholder.png'"
      :class="$style.cover"
      loading="lazy"
      width="200"
      style="float: right; padding-left: 2rem;"
    >
    Probably reading
    <h3>{{ book.title }} ({{ book.release }})</h3>
    <sub :class="$style.author">
      by <em>{{ book.author }}</em>
    </sub>
    <p v-if="challenge" :class="$style.progress">
      {{ challenge.description }}: {{ challenge.progress }} of {{ challenge.goal }} books completed
      <progress
        :class="$style.progressBar"
        :max="challenge.goal"
        :value="challenge.progress"
      />
    </p>
  </div>

  <div
    v-if="latestReview"
  >
    <img
      :alt="`The book cover of ${latestReview.book.title}`"
      :src="latestReview.book.cover"
      loading="lazy"
      width="200"
      :class="$style.cover"
      style="float: left; padding-right: 2rem;"
    >
    Just finished reading
    <h3>{{ latestReview.book.title }} ({{ latestReview.book.release }})</h3>
    <sub :class="$style.author">
      by <em>{{ latestReview.book.author }}</em>
    </sub>
    <p>Rating: {{ latestReview.rating }} / 5</p>

    <base-slate-block
      v-if="latestReview.slateContent"
      :document="latestReview.slateContent"
    />
  </div>
</template>

<script lang="ts" setup>
import BaseSlateBlock from '~/components/base/slate-block.vue'

const { data } = await useGraphqlQuery('reading')

const challenge = computed(() => data.me[0]?.goals[0])

const user = computed(() => data.me[0]?.goals[0]?.user)

const book = computed(() => {
  const userBook = user.value?.user_books[0]
  return {
    title: userBook?.book?.title ?? 'title unknown',
    author: userBook?.book?.contributions?.[0]?.author?.name ?? 'author unknown',
    cover: userBook?.book?.image?.url,
    release: userBook?.book?.release_year ?? 'year unknown',
  }
})

const latestReview = computed(() => {
  const userReviews = user.value?.reviews[0]
  if (!userReviews) {
    return null
  }

  const slateContent = typeof userReviews.review_slate === 'string'
    ? JSON.parse(userReviews.review_slate)
    : userReviews.review_slate

  return {
    book: {
      title: userReviews.book.title ?? 'title unknown',
      author: userReviews.book.contributions[0]?.author?.name ?? 'author unknown',
      cover: userReviews.book.image?.url,
      release: userReviews.book.release_year ?? 'year unknown',
    },
    rating: userReviews.rating,
    slateContent,
  }
})
</script>

<style module>
.cover {
  @media (max-width: 600px) {
    margin: 0 auto;
  }
  object-fit: contain;
  padding-bottom: 2rem;
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

.author {
  padding-top: 0.5rem;
}

h3 {
  font-size: 1.2rem;
  margin: 0;
}
</style>
