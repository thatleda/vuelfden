<template>
  <transition-animation>
    <about-leda
      :content="aboutPage.content"
      :image-id="aboutPage.banner.asset._ref"
    />
  </transition-animation>
  <h2>{{ previouslyPage.title }}</h2>
  <sanity-content :blocks="previouslyPage.content" />
</template>

<script setup>
import transitionAnimation from "~/components/base/transition-animation.vue";

const query = groq`*[_type == "page" && slug.current == $slug][0]`;
const { data: previouslyPage } = useSanityQuery(query, { slug: "previously" });
const { data: aboutPage } = useSanityQuery(query, { slug: "who" });
</script>
