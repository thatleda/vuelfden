<template>
  <pre :class="$style.centered"><slot /></pre>
</template>

<style module>
.centered {
  font-family: var(--base-font);
  text-align: center;
  font-style: italic;
}
</style>
