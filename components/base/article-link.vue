<template>
  <NuxtLink :to="href" target="_blank" :class="$style.link"><slot /></NuxtLink>
</template>

<script lang="ts" setup>
const { href } = defineProps<{ href: string }>();
</script>

<style module>
.link {
  &:hover {
    text-decoration: underline;
  }
}
</style>
