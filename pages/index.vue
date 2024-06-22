<template>
  <hero-banner :page="hero" />
  <page-section anchor="who" heading="Who?">
    <about-leda v-if="aboutPage" :about-page="aboutPage" />
  </page-section>
  <page-section>
    <lazy-work-playlist />
  </page-section>
  <page-section
    v-if="previouslyPage"
    :heading="previouslyPage.title"
    anchor="previously"
  >
    <sanity-block :blocks="previouslyPage.content" />
  </page-section>
  <page-section v-if="reviews" anchor="reviews" heading="Reviews">
    <review v-for="review in reviews" :key="review._id" :review="review" />
  </page-section>
  <page-section anchor="contact" heading="What is she up to?">
    <reading-now :book="book" />
    <contact-leda />
  </page-section>
</template>

<script lang="ts" setup>
import type { SanityBook, SanityPage, SanityReview } from '~/@types/sanity'

import PageSection from '~/components/base/page-section.vue'
import Review from '~/components/base/review.vue'
import SanityBlock from '~/components/base/sanity-block.vue'
import contactLeda from '~/components/contact-leda.vue'
import HeroBanner from '~/components/hero-banner.vue'
import LazyWorkPlaylist from '~/components/work-playlist.vue'

const query = groq`*[_type == "page" && slug.current == $slug][0]`
const reviewsQuery = groq`*[_type == "review"] | order(_createdAt desc)[0..4]`
const bookQuery = groq`*[_type == "book"] | order(_createdAt desc)[0]`

const { data: hero } = useSanityQuery<SanityPage>(query, { slug: 'hero' })
const { data: previouslyPage } = useSanityQuery<SanityPage>(query, {
  slug: 'previously',
})
const { data: aboutPage } = useSanityQuery<SanityPage>(query, { slug: 'who' })
const { data: reviews } = useSanityQuery<SanityReview[]>(reviewsQuery)
const { data: book } = useSanityQuery<SanityBook>(bookQuery)

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      href: '/apple-touch-icon.png',
      rel: 'apple-touch-icon',
      sizes: '180x180',
    },
    {
      href: '/favicon-32x32.png',
      rel: 'icon',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      href: '/favicon-16x16.png',
      rel: 'icon',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      color: '#a7f8b1',
      href: '/safari-pinned-tab.svg',
      rel: 'mask-icon',
    },
  ],
})

useSeoMeta({
  description:
    'Leda is a passionate software engineer, whose empathetic and playful approach to problems is sure to find a solution for you.',
  ogImage: '/images/wolf.jpeg',
  ogTitle: 'Vuelfden - the Nuxt Edition of Leda Wolf\'s website',
  robots:
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  title: 'Vuelfden',
})
</script>
