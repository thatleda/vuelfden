<template>
  <div>
    <div :class="$style.card">
      <div :class="$style.description">
        <span>
          Probably reading
          <h3>{{ book.title }} ({{ book.release }})</h3>
          <sub :class="$style.author">
            by <em>{{ book.author }}</em>
          </sub>
        </span>
        <div
          v-if="challenge"
          :class="$style.progress"
        >
          <p>
            {{ challenge.description }}: {{ challenge.progress }} of {{ challenge.goal }} books completed
          </p>
          <progress
            :class="$style.progressBar"
            :max="challenge.goal"
            :value="challenge.progress"
          />
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

    <div
      v-if="latestReview"
      :class="$style.description"
    >
      <span>
        Just finished reading
        <h3>{{ latestReview.book.title }} ({{ latestReview.book.release }})</h3>
        <sub :class="$style.author">
          by <em>{{ latestReview.book.author }}</em>
        </sub>
      </span>
      <p>Rating: {{ latestReview.rating }} / 5</p>
      <div :class="$style.card">
        <img
          :alt="`The book cover of ${latestReview.book.title}`"
          :src="latestReview.book.cover"
          loading="lazy"
          width="150"
          :class="$style.cover"
        >
        <base-slate-block
          v-if="latestReview.slateContent"
          :document="latestReview.slateContent"
        />
      </div>
    </div>
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
  @media (max-width: 600px) {
    margin: 0 auto;
  }

  padding: 1rem;
  object-fit: contain;
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

.author {
  padding-top: 0.5rem;
}

h3 {
  font-size: 1.2rem;
  margin: 0;
}
</style>
