<template>
  <div :class="$style.centered">
    <q lang="en" :class="$style.quotation"><slot /></q>
  </div>
</template>

<style module>
.centered {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.quotation {
  quotes: auto;
  font-style: italic;
}
</style>
