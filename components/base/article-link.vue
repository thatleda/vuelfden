<script lang="ts" setup>
export interface ArticleLinkProps {
  href: string
}

const { href } = defineProps<ArticleLinkProps>()
</script>

<template>
  <NuxtLink :to="href" target="_blank" :class="$style.link">
    <slot />
  </NuxtLink>
</template>

<style module>
.link {
  &:hover {
    text-decoration: underline;
  }
}
</style>
