<template>
  <page-header ref="header" />
  <main><NuxtPage /></main>
  <page-footer />
</template>

<script lang="ts" setup>
const header = ref<{ isMenuOpen: boolean }>({ isMenuOpen: false })

const prefersReducedMotion = useMediaQuery('prefers-reduced-motion')

useHead({
  bodyAttrs: {
    class: computed(() => {
      return header.value.isMenuOpen || prefersReducedMotion ? 'static' : ''
    }),
  },
})
</script>

<style>
html {
  scroll-behavior: smooth;
}

* {
  box-sizing: border-box;
}

:root {
  --border-radius: 1rem;
  --page-width: 62rem;
  --page-padding: 0 1rem;
  --header-height: 6.25rem;
  --footer-height: 7.5rem;
  --base-font: Fira Sans, sans-serif;
}

.dark-mode {
  --primary-color: #fafafa;
  --secondary-color: #0c4e28;
  --tertiary-color: #527766;
  --text-color: #b1b1b1;
  --subtext-color: #e6e6e6;
  --background-color: #121212;
  --card-background-color: #202020;
  --scroll-bar-color: rgba(255, 255, 255, 0.5);
  --box-shadow-color: rgba(0, 0, 0, 0.16);
  --box-shadow-hover-color: rgba(0, 0, 0, 0.32);
}

.light-mode {
  --primary-color: #000000;
  --secondary-color: #94e4af;
  --tertiary-color:rgb(23, 67, 41);
  --text-color: #000000;
  --subtext-color: #555555;
  --background-color: #d2d2d2;
  --card-background-color: #dddddd;
  --scroll-bar-color: rgba(0, 0, 0, 0.5);
  --box-shadow-color: #dddddd;
  --box-shadow-hover-color: rgba(0, 0, 0, 0.32);
}

.static * {
  -webkit-animation: none !important;
  -moz-animation: none !important;
  -o-animation: none !important;
  animation: none !important;
}

body {
  height: 100%;
  background-color: var(--background-color);

  /* Disable smooth scrolling when users have prefers-reduced-motion enabled */
  @media screen and (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }

  font-size: 18px;
  font-weight: 300;
  font-family: var(--base-font);
  text-rendering: optimizeLegibility;
  color: var(--text-color);
  @media (max-width: 749px) {
    font-size: 12px;
  }

  @media (max-width: 1030px) {
    font-size: 16px;
  }
}

a {
  text-decoration: none;
  text-decoration-skip-ink: auto;
  color: var(--subtext-color);
  cursor: pointer;

  &:hover {
    outline: 0;
  }

  &:focus {
    outline-color: var(--subtext-color);
    outline-style: dotted;
    outline-width: 2px;
  }
}

svg {
  fill: var(--text-color);
}

h1 {
  font-family: Silkscreen, sans-serif;
  font-size: 2.5rem;
}

h2 {
  font-family: Satisfy, cursive;
  font-size: 2.5rem;
  margin: 0;
  color: var(--text-color);
}

h3 {
  text-transform: uppercase;
}

em {
  font-family: Satisfy, cursive;
  font-style: normal;
  line-height: 1rem;
  font-size: 1.5rem;
  color: var(--primary-color);
}

strong {
  color: var(--tertiary-color);
  font-weight: 800;
  line-height: 1rem;
}

u {
  text-decoration: none;
  box-shadow: inset 0 -0.7em 0 var(--secondary-color);
  transition: box-shadow 0.3s ease-out;
  &:hover {
    box-shadow: inset 0 -1.5em 0 var(--secondary-color);
  }
}
</style>
