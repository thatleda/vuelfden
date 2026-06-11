<script lang="ts" setup>
import type { SanityPage, SanityReview } from '~/@types/sanity'
import groq from 'groq'
import { useSanityQuery } from '~/composables/useSanity'
import { useTranslations } from '~/composables/useTranslations'

const { lang } = useLanguage()
const { t } = useTranslations()

const homePageQuery = groq`{
  "hero": *[_type == "page" && slug.current == "hero" && language == $lang][0]{
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
  "previously": *[_type == "page" && slug.current == "previously" && language == $lang][0]{
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
  "about": *[_type == "page" && slug.current == "who" && language == $lang][0]{
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
  }
}`

const params = computed(() => ({ lang: lang.value }))

const { data: homeData } = useSanityQuery<{
  hero: SanityPage
  previously: SanityPage
  about: SanityPage
  reviews: SanityReview[]
}>(homePageQuery, params)

const hero = computed(() => homeData.value?.hero)
const previouslyPage = computed(() => homeData.value?.previously)
const aboutPage = computed(() => homeData.value?.about)
const reviews = computed(() => homeData.value?.reviews)

useHead({
  htmlAttrs: {
    lang: lang.value,
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
  ogLocale: lang.value,
  robots:
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  title: 'Vuelfden',
})
</script>

<template>
  <hero-banner v-if="hero" :page="hero" :is-card="true" />
  <base-page-section anchor="who" :heading="t('section.who')" :is-card="true">
    <about-leda v-if="aboutPage" :about-page="aboutPage" :is-card="true" />
  </base-page-section>
  <base-page-section
    v-if="previouslyPage"
    :heading="previouslyPage.title"
    anchor="previously"
    :is-card="true"
  >
    <base-sanity-block :blocks="previouslyPage.content" />
  </base-page-section>
  <base-page-section v-if="reviews" anchor="reviews" :heading="t('section.reviews')" :is-card="true">
    <base-review v-for="review in reviews" :key="review._id" :review="review" />
  </base-page-section>
  <base-page-section anchor="contact" :heading="t('section.contact')" :is-card="true">
    <reading-now />
  </base-page-section>
  <base-page-section :is-card="true">
    <contact-leda />
  </base-page-section>
</template>
