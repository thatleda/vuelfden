<template>
  <nav aria-label="Article navigation" role="navigation" :class="$style.nav">
    <ul><li /></ul>
  </nav>
</template>

<script lang="ts" setup>
// interface ArticlePaginationProps {
//   pagesTotal: number
// }

// const { pagesTotal } = defineProps<ArticlePaginationProps>()
</script>

<style module>
.nav {
  display: flex;
  justify-content: center;
}

.wrapper {
  padding-inline-start: 0;
  display: flex;
  list-style-type: none;
}

.listItem {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
}
</style>
