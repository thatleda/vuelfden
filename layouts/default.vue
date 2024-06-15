<template>
  <nav>
    <link-button to="/">
      <wolf mirror height="5rem" width="5rem" />
    </link-button>
    <link-button to="/#who" text="Who?" />
    <link-button to="/#previously" text="Previously" />
    <link-button to="/ramblings" text="Blog" />
    <link-button to="/#testimonials" text="Working with Leda" />
    <link-button to="/#contact" text="Contact" />
    <link-button
      text="CV"
      variant="primary"
      to="resume.pdf"
      target="_blank"
      download="resume.pdf"
    />
  </nav>
  <NuxtPage />
</template>
<script setup>
import LinkButton from "~/components/base/link-button.vue";
import wolf from "~/components/svg/wolf.vue";
</script>
