<template>
  <hero-banner v-if="hero" :page="hero" />
  <base-page-section anchor="who" heading="Who?">
    <about-leda v-if="aboutPage" :about-page="aboutPage" />
  </base-page-section>
  <base-page-section>
    <lazy-work-playlist />
  </base-page-section>
  <base-page-section
    v-if="previouslyPage"
    :heading="previouslyPage.title"
    anchor="previously"
  >
    <base-sanity-block :blocks="previouslyPage.content" />
  </base-page-section>
  <base-page-section v-if="reviews" anchor="reviews" heading="Reviews">
    <base-review v-for="review in reviews" :key="review._id" :review="review" />
  </base-page-section>
  <base-page-section anchor="contact" heading="What is she up to?">
    <reading-now v-if="book" :book="book" />
  </base-page-section>
  <base-page-section>
    <contact-leda />
  </base-page-section>
</template>

<script lang="ts" setup>
import type { SanityBook, SanityPage, SanityReview } from '~/@types/sanity'
import groq from 'groq'
import { useSanityQuery } from '~/composables/useSanity'

const homePageQuery = groq`{
  "hero": *[_type == "page" && slug.current == "hero"][0]{
    _createdAt,
    _updatedAt,
    _id,
    content,
    excerpt,
    slug,
    title,
    "banner": banner.asset->{
      _id,
      _type,
      altText
    }
  },
  "previously": *[_type == "page" && slug.current == "previously"][0]{
    _createdAt,
    _updatedAt,
    _id,
    content,
    excerpt,
    slug,
    title,
    "banner": banner.asset->{
      _id,
      _type,
      altText
    }
  },
  "about": *[_type == "page" && slug.current == "who"][0]{
    _createdAt,
    _updatedAt,
    _id,
    content,
    excerpt,
    slug,
    title,
    "banner": banner.asset->{
      _id,
      _type,
      altText
    }
  },
  "reviews": *[_type == "review"] | order(_createdAt desc){
    _createdAt,
    _updatedAt,
    _id,
    comment,
    excerpt,
    reviewer,
    "picture": picture.asset->{
      _id,
      _type,
      altText
    }
  },
  "book": *[_type == "book"] | order(_createdAt desc)[0]{
    _createdAt,
    _updatedAt,
    _id,
    author,
    notes,
    number,
    title,
    url,
    "cover": cover.asset->{
      _id,
      _type,
      altText
    }
  }
}`

const { data: homeData } = useSanityQuery<{
  hero: SanityPage
  previously: SanityPage
  about: SanityPage
  reviews: SanityReview[]
  book: SanityBook
}>(homePageQuery)

const hero = computed(() => homeData.value?.hero)
const previouslyPage = computed(() => homeData.value?.previously)
const aboutPage = computed(() => homeData.value?.about)
const reviews = computed(() => homeData.value?.reviews)
const book = computed(() => homeData.value?.book)

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
