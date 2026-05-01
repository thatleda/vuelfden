<script lang="ts" setup>
import BaseSlateBlock from '~/components/base/slate-block.vue'
import { useTranslations } from '~/composables/useTranslations'

const { data, pending } = await useAsyncGraphqlQuery('reading', {}, { server: false })

const { lang } = useLanguage()
const { t } = useTranslations()

const challenge = computed(() => data.value?.data?.me[0]?.goals[0])

const user = computed(() => data.value?.data?.me[0]?.goals[0]?.user)

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

<template>
  <div v-if="pending" :class="$style.loading" aria-busy="true" />

  <div v-else :class="$style.card">
    <NuxtImg
      :alt="`The book cover of ${book.title} by ${book.author}`"
      :srcset="book.cover || '/images/book-cover-placeholder.png'"
      :class="[$style.bookCover, $style.image]"
    />
    {{ t('reading.title') }}
    <h3>{{ book.title }} ({{ book.release }})</h3>
    <sub :class="$style.author">
      {{ t('reading.book.by') }} <em>{{ book.author }}</em>
    </sub>
    <p v-if="challenge" :class="$style.progress">
      <label for="progress">{{ t('reading.challenge') }} {{ challenge.description }} : {{ challenge.progress }} {{ t('reading.challenge.of') }} {{ challenge.goal }} {{ t('reading.challenge.completed') }}
        <progress
          id="progress"
          :class="$style.progressBar"
          :max="challenge.goal"
          :value="challenge.progress"
        /></label>
    </p>
  </div>

  <div
    v-if="!pending && latestReview"
    :class="$style.card"
  >
    <NuxtImg
      :alt="`The book cover of ${latestReview.book.title}`"
      :srcset="latestReview.book.cover"
      loading="lazy"
      :class="[$style.image, $style.reviewCover]"
    />
    {{ t('reading.finished') }}
    <h3>{{ latestReview.book.title }} ({{ latestReview.book.release }})</h3>
    <sub :class="$style.author">
      {{ t('reading.book.by') }} <em>{{ latestReview.book.author }}</em>
    </sub>
    <p>{{ t('reading.book.rating') }}: {{ Intl.NumberFormat(lang).format(latestReview.rating) }} / 5 {{ t('reading.book.stars') }}</p>

    <BaseSlateBlock
      v-if="latestReview.slateContent"
      :document="latestReview.slateContent"
    />
  </div>
</template>

<style module>
.loading {
  height: 12rem;
  opacity: 0.4;
  border-radius: var(--border-radius);
  background: var(--subtext);
  animation: aurora 1.5s ease-in-out infinite;
}

.card {
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
}

.image {
  max-width: 15rem;
  border-radius: var(--border-radius);
  margin-bottom: 2rem;
  object-fit: contain;
}

.bookCover {
  float: right;
  margin-left: 2rem;
  @media (max-width: 700px) {
    float: none;
    margin: 1rem auto;
  }
}

.reviewCover {
  float: left;
  margin-right: 2rem;
  @media (max-width: 700px) {
    float: none;
    margin: 1rem auto;
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
