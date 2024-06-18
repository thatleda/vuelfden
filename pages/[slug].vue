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
</script>
