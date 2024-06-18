<template>
  <hero-banner />
  <page-section anchor="who" heading="Who?">
    <about-leda v-if="aboutPage" :about-page="aboutPage" />
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
    <contact-leda />
  </page-section>
</template>

<script lang="ts" setup>
import type { SanityPage, SanityReview } from "~/@types/sanity";

import PageSection from "~/components/base/page-section.vue";
import Review from "~/components/base/review.vue";
import SanityBlock from "~/components/base/sanity-block.vue";
import contactLeda from "~/components/contact-leda.vue";
import HeroBanner from "~/components/hero-banner.vue";

const query = groq`*[_type == "page" && slug.current == $slug][0]`;
const reviewsQuery = groq`*[_type == "review"] | order(_createdAt desc)[0..4]`;
const { data: previouslyPage } = useSanityQuery<SanityPage>(query, {
  slug: "previously",
});
const { data: aboutPage } = useSanityQuery<SanityPage>(query, { slug: "who" });
const { data: reviews } = useSanityQuery<SanityReview[]>(reviewsQuery);
</script>
