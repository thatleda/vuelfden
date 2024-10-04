<template>
  <pre :class="$style.centered"><slot /></pre>
</template>

<style module>
.centered {
  font-family: var(--base-font);
  font-style: italic;
  text-align: center;
  color: var(--primary-color);
}
</style>
