<template>
  <nav>
    <link-button href="/">
      <wolf mirror height="5rem" width="5rem" />
    </link-button>
    <link-button href="/#who" text="Who?" />
    <link-button href="/#previously" text="Previously" />
    <link-button href="/ramblings" text="Blog" />
    <link-button href="/#testimonials" text="Working with Leda" />
    <link-button href="/#contact" text="Contact" />
  </nav>
  <NuxtPage />
</template>
<script setup>
import LinkButton from "~/components/base/link-button.vue";
import wolf from "~/components/svg/wolf.vue";
</script>
