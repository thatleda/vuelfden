<template>
  <base-page-section heading="Unhinged ramblings">
    <nav
      v-if="articles?.length || hasPreviousPage"
      :class="$style.pagination"
      aria-label="Blog pagination"
      role="navigation"
    >
      <link-button
        v-if="hasPreviousPage"
        :to="previousPageUrl"
        variant="secondary"
        :aria-label="`Go to previous page, page ${currentPage - 1}`"
      >
        ← Previous
      </link-button>

      <span
        :class="$style.pageInfo"
        aria-live="polite"
        aria-current="page"
      >
        Page {{ currentPage }} of {{ totalPages }}
      </span>

      <link-button
        v-if="hasNextPage"
        :to="nextPageUrl"
        variant="secondary"
        :aria-label="`Go to next page, page ${currentPage + 1}`"
      >
        Next →
      </link-button>
    </nav>

    <output
      v-if="isLoading"
      :class="$style.loading"
      aria-live="polite"
    >
      Loading articles...
    </output>

    <main
      ref="mainContent"
      :class="$style.articles"
      role="main"
      aria-label="Blog articles"
      tabindex="-1"
    >
      <transition-animation
        v-for="(article, index) in articles"
        :key="article._id"
        animation-name="fade-up"
        animation-duration="0.6s"
        :animation-delay="`${index * 0.1}s`"
        animation-timing="ease-out"
      >
        <base-article-card
          :article="article"
        />
      </transition-animation>
    </main>
  </base-page-section>
</template>

<script lang="ts" setup>
import type { SanityPage } from '~/@types/sanity'
import groq from 'groq'
import LinkButton from '~/components/base/link-button.vue'
import TransitionAnimation from '~/components/base/transition-animation.vue'

const route = useRoute()
const pageSize = 10
const mainContent = ref<HTMLElement>()

const currentPage = computed(() => {
  const pageNumber = Number.parseInt(route.params.number as string, 10)
  return Number.isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber
})

const articlesQuery = groq`*[_type == "article"] | order(_createdAt desc){
  _createdAt, 
  _updatedAt, 
  _id, 
  excerpt, 
  slug,
  title, 
  "banner": banner.asset->{
    _id, 
    _type, 
    altText
  }
}`

const { data: allArticles, pending: isLoading } = useSanityQuery<SanityPage[]>(articlesQuery)

const articles = computed(() => getCurrentPageArticles())
const totalPages = computed(() => calculateTotalPages())
const hasNextPage = computed(() => currentPage.value < totalPages.value)
const hasPreviousPage = computed(() => currentPage.value > 1)

const nextPageUrl = computed(() => `/ramblings/page/${currentPage.value + 1}`)
const previousPageUrl = computed(() => {
  if (currentPage.value === 2) {
    return '/ramblings'
  }
  return `/ramblings/page/${currentPage.value - 1}`
})

function getCurrentPageArticles() {
  if (!allArticles.value) {
    return []
  }
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return allArticles.value.slice(startIndex, endIndex)
}

function calculateTotalPages() {
  if (!allArticles.value) {
    return 0
  }
  return Math.ceil(allArticles.value.length / pageSize)
}

if (currentPage.value > totalPages.value && totalPages.value > 0) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

useSeoMeta({
  description: `Page ${currentPage.value} of Leda Wolf's unhinged ramblings and wisdom nuggets.`,
  ogImage: '/images/wolf.jpeg',
  ogTitle: `Ramblings - Page ${currentPage.value}`,
  robots: 'noindex, follow',
  title: `Ramblings - Page ${currentPage.value}`,
})

useHead({
  link: [
    hasPreviousPage.value
      ? {
          rel: 'prev',
          href: previousPageUrl.value,
        }
      : null,
    hasNextPage.value
      ? {
          rel: 'next',
          href: nextPageUrl.value,
        }
      : null,
  ].filter(Boolean),
})
</script>

<style module>
.articles {
  display: grid;
  grid-row-gap: 1rem;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
}

.pageInfo {
  font-weight: 500;
  color: var(--color-text, #333);
}

.loading {
  text-align: center;
  padding: 2rem;
  color: var(--color-text-muted, #666);
  font-style: italic;
}
</style>
