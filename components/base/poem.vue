<template>
  <pre :class="$style.centered"><slot /></pre>
</template>

<style module>
.centered {
  font-family: Fira Sans Condensed, sans-serif;
  font-style: italic;
  text-align: center;
  color: var(--primary-color);
}
</style>
