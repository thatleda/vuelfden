<template>
  <page-section v-if="page">
    <h1>{{ page.title }}</h1>
    <sanity-block :blocks="page.content"></sanity-block>
  </page-section>
</template>

<script lang="ts" setup>
import type { SanityPage } from "~/@types/sanity";

import PageSection from "~/components/base/page-section.vue";
import SanityBlock from "~/components/base/sanity-block.vue";

const route = useRoute();
const { slug } = route.params;

const query = groq`*[slug.current == $slug][0]`;
const { data: page } = useSanityQuery<SanityPage>(query, { slug });
useSeoMeta({
  description:
    page.value?.excerpt ??
    "Leda is a passionate software engineer, whose empathetic and playful approach to problems is sure to find a solution for you.",
  ogImage: "/images/wolf.jpeg",
  ogTitle:
    page.value?.title ?? "Vuelfden - the Nuxt Edition of Leda Wolf's website",
  title: page.value?.title ?? "Vuelfden",
});
</script>
