<template>
  <ClientOnly><page-header ref="header" /></ClientOnly>
  <main><NuxtPage /></main>
  <page-footer />
</template>

<script lang="ts" setup>
import { useDark, usePreferredReducedMotion } from '@vueuse/core'
import PageHeader from '~/components/page-header.vue'

const header = ref<{ isMenuOpen: boolean }>({ isMenuOpen: false })

const prefersReducedMotion = usePreferredReducedMotion()
const darkMode = useDark({ storageKey: 'vuelfden-dark-mode' })

useHead({
  bodyAttrs: {
    class: computed(() => {
      const bodyClass = darkMode.value ? 'dark-mode' : 'light-mode'
      if (header.value.isMenuOpen || prefersReducedMotion.value === 'reduce') {
        return `${bodyClass} static`
      }
      return bodyClass
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
  --background-color: #1a1a1a;
  --card-background-color: #2a2a2a;
  --background-gradient:
    radial-gradient(ellipse at 20% 50%, rgba(120, 200, 80, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(100, 150, 255, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 40% 80%, rgba(200, 100, 255, 0.2) 0%, transparent 50%),
    linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 25%, #0f1f15 50%, #1a1a2e 75%, #0a0a1a 100%);
  --card-background-gradient: #2a2a2a;
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
  --background-gradient: linear-gradient(135deg, #d2d2d2 0%, #e0e0e0 25%, #c8e6d0 50%, #e0e0e0 75%, #d2d2d2 100%);
  --card-background-gradient: linear-gradient(135deg, #dddddd 0%, #f0f0f0 25%, #e8f5ea 50%, #f0f0f0 75%, #dddddd 100%);
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

.static body::before,
.static body::after {
  -webkit-animation: none !important;
  -moz-animation: none !important;
  -o-animation: none !important;
  animation: none !important;
}

@media screen and (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  height: 100%;
  background: var(--background-gradient);
  position: relative;
  overflow-x: hidden;

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

.dark-mode body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:

    /* Dense cluster 3 */
    radial-gradient(1px 1px at 320px 50px, #fff, transparent),
    radial-gradient(1px 1px at 325px 55px, rgba(255,255,255,0.8), transparent),
    radial-gradient(2px 2px at 318px 48px, rgba(255,255,255,0.9), transparent),
    radial-gradient(1px 1px at 322px 51px, rgba(255,255,255,0.7), transparent),

    /* Scattered individual stars */
    radial-gradient(1px 1px at 100px 30px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 150px 150px, rgba(255,255,255,0.6), transparent),
    radial-gradient(1px 1px at 250px 32px, rgba(255,255,255,0.9), transparent),
    radial-gradient(1px 1px at 390px 120px, rgba(255,255,255,0.7), transparent),
    radial-gradient(1px 1px at 420px 92px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 80px 140px, rgba(255,255,255,0.6), transparent);
  background-repeat: repeat;
  background-size: 400px 200px;
  animation: twinkle 4s ease-in-out infinite;
  pointer-events: none;
  z-index: -2;
}

.dark-mode body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    /* Bright accent stars */
    radial-gradient(3px 3px at 120px 60px, rgba(200,200,255,0.9), transparent),
    radial-gradient(2px 2px at 280px 40px, rgba(255,200,200,0.8), transparent),
    radial-gradient(3px 3px at 400px 110px, rgba(200,255,200,0.9), transparent),
    radial-gradient(2px 2px at 201px 123px, rgba(255,255,200,0.8), transparent),
    radial-gradient(3px 3px at 354px 184px, rgba(200,200,255,0.7), transparent),
    radial-gradient(2px 2px at 84px 90px, rgba(255,200,255,0.8), transparent),
    radial-gradient(3px 3px at 459px 70px, rgba(200,255,255,0.9), transparent),
    radial-gradient(2px 2px at 30px 160px, rgba(255,255,200,0.7), transparent);
  background-repeat: repeat;
  background-size: 800px 250px;
  animation: twinkle-slow 6s ease-in-out infinite;
  pointer-events: none;
  z-index: -1;
}

.dark-mode body {
  background: var(--background-gradient);
}

@media screen and (prefers-reduced-motion: reduce) {
  body::before,
  body::after {
    animation: none !important;
  }
  .dark-mode body {
    animation: none !important;
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

img {
  border-radius: var(--border-radius);
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
