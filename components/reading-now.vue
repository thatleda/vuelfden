<template>
  <div>
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

    <div v-if="latestReview">
      <h3>Latest review</h3>
      <div :class="$style.card">
        <img
          :alt="`The book cover of ${latestReview.book.title}`"
          :src="latestReview.book.cover"
          loading="lazy"
          width="150"
          :class="$style.cover"
        >
        <div :class="$style.description">
          <span><b>{{ latestReview.book.title }} ({{ latestReview.book.release }})</b> by {{ latestReview.book.author }}</span>
          <span>Rating: {{ latestReview.rating }} / 5</span>
          <b v-if="latestReview.hasSpoilers">
            Contains spoilers
          </b>
          <div v-else v-html="latestReview.html || latestReview.text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data } = await useGraphqlQuery('reading')

const challenge = computed(() => data.me[0]?.goals[0])

const user = computed(() => data.me[0]?.goals[0]?.user)

const book = computed(() => {
  const userBook = user.value?.user_books[0]
  return {
    title: userBook?.book?.title ?? 'Unknown Title',
    author: userBook?.book?.contributions?.[0]?.author?.name ?? 'Unknown Author',
    cover: userBook?.book?.image?.url,
    release: userBook?.book?.release_year ?? 'year unknown',
  }
})

const latestReview = computed(() => {
  const userReviews = user.value?.reviews[0]
  return {
    book: {
      title: userReviews?.book.title ?? 'Unknown Title',
      author: userReviews?.book.contributions[0]?.author?.name ?? 'Unknown Author',
      cover: userReviews?.book.image?.url,
      release: userReviews?.book.release_year ?? 'year unknown',
    },
    rating: userReviews?.rating,
    text: userReviews?.review ?? '',
    html: userReviews?.review_html,
    hasSpoilers: userReviews?.review_has_spoilers,
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
  object-fit: cover
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
</style>
