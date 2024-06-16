<template>
  <hero-banner />
  <page-section anchor="who" heading="Who?">
    <about-leda
      :content="aboutPage.content"
      :image-id="aboutPage.banner.asset._ref"
    />
  </page-section>
  <page-section :heading="previouslyPage.title" anchor="previously">
    <sanity-block :blocks="previouslyPage.content" />
  </page-section>
</template>

<script setup>
import PageSection from "~/components/base/page-section.vue";
import SanityBlock from "~/components/base/sanity-block.vue";
import HeroBanner from "~/components/hero-banner.vue";

const query = groq`*[_type == "page" && slug.current == $slug][0]`;
const { data: previouslyPage } = useSanityQuery(query, { slug: "previously" });
const { data: aboutPage } = useSanityQuery(query, { slug: "who" });
</script>
