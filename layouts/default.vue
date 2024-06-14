<template>
  <nav>
    <NuxtLink to="/"><wolf height="5rem" mirror width="5rem"></wolf></NuxtLink>
    <NuxtLink to="/#who">Who?</NuxtLink>
    <NuxtLink to="/#previously">Previously</NuxtLink>
    <NuxtLink to="/ramblings">Blog</NuxtLink>
    <NuxtLink to="/#testimonials">Working with Leda</NuxtLink>
    <NuxtLink to="/#contact">Contact</NuxtLink>
  </nav>
  <NuxtPage />
</template>
<script setup>
import wolf from "~/components/svg/wolf.vue";
</script>
