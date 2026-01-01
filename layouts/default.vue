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
useDark({
  storageKey: 'vuelfden-dark-mode',
  selector: 'body',
  valueDark: 'dark-mode',
  valueLight: 'light-mode',
})

useHead({
  bodyAttrs: {
    class: computed(() => {
      if (header.value.isMenuOpen || prefersReducedMotion.value === 'reduce') {
        return 'reduce-motion'
      }
      return ''
    }),
  },
  htmlAttrs: {
    lang: 'en',
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

.reduce-motion * {
  -webkit-animation: none !important;
  -moz-animation: none !important;
  -o-animation: none !important;
  animation: none !important;
}

.reduce-motion body::before,
.reduce-motion body::after {
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

body.dark-mode::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(1px 1px at 47px 83px, #fff, transparent),
    radial-gradient(1px 1px at 189px 142px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 312px 31px, rgba(255,255,255,0.7), transparent),
    radial-gradient(1px 1px at 521px 167px, rgba(255,255,255,0.9), transparent),
    radial-gradient(2px 2px at 634px 94px, rgba(255,255,255,0.85), transparent),
    radial-gradient(1px 1px at 98px 178px, rgba(255,255,255,0.6), transparent),
    radial-gradient(1px 1px at 743px 51px, rgba(255,255,255,0.75), transparent),
    radial-gradient(1px 1px at 271px 129px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 456px 7px, rgba(255,255,255,0.7), transparent),
    radial-gradient(1px 1px at 823px 114px, rgba(255,255,255,0.65), transparent),
    radial-gradient(2px 2px at 147px 23px, rgba(255,255,255,0.9), transparent),
    radial-gradient(1px 1px at 592px 186px, rgba(255,255,255,0.7), transparent);
  background-repeat: repeat;
  background-size: 900px 200px;
  animation: twinkle 4s ease-in-out infinite;
  pointer-events: none;
  z-index: -2;
}

body.dark-mode::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(2px 2px at 234px 87px, rgba(200,200,255,0.85), transparent),
    radial-gradient(3px 3px at 678px 143px, rgba(255,200,200,0.75), transparent),
    radial-gradient(2px 2px at 89px 219px, rgba(200,255,200,0.8), transparent),
    radial-gradient(3px 3px at 512px 34px, rgba(255,255,200,0.9), transparent),
    radial-gradient(2px 2px at 321px 176px, rgba(200,200,255,0.7), transparent),
    radial-gradient(3px 3px at 756px 98px, rgba(255,200,255,0.85), transparent),
    radial-gradient(2px 2px at 123px 12px, rgba(200,255,255,0.8), transparent),
    radial-gradient(3px 3px at 445px 201px, rgba(255,255,200,0.75), transparent),
    radial-gradient(2px 2px at 890px 67px, rgba(200,200,255,0.7), transparent),
    radial-gradient(3px 3px at 167px 154px, rgba(255,200,200,0.8), transparent);
  background-repeat: repeat;
  background-size: 950px 250px;
  animation: twinkle-slow 6s ease-in-out infinite;
  pointer-events: none;
  z-index: -1;
}

body.dark-mode {
  background: var(--background-gradient);
}

@media screen and (prefers-reduced-motion: reduce) {
  body.dark-mode::before,
  body.dark-mode::after {
    animation: none !important;
  }
  body.dark-mode {
    animation: none !important;
  }
}

body.dark-mode.reduce-motion::before,
body.dark-mode.reduce-motion::after {
  animation: none !important;
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
