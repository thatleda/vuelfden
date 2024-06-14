<template>
  <page-section anchor="who" heading="Who?">
    <about-leda
      :content="aboutPage.content"
      :image-id="aboutPage.banner.asset._ref"
    />
  </page-section>
  <page-section :heading="previouslyPage.title" anchor="previously">
    <div><sanity-content :blocks="previouslyPage.content" /></div>
  </page-section>
</template>

<script setup>
import pageSection from "~/components/base/page-section.vue";

const query = groq`*[_type == "page" && slug.current == $slug][0]`;
const { data: previouslyPage } = useSanityQuery(query, { slug: "previously" });
const { data: aboutPage } = useSanityQuery(query, { slug: "who" });
</script>
