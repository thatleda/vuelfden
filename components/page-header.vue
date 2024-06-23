<template>
  <nav :class="$style.navigation">
    <div :class="$style.links">
      <link-button to="/" title="Home">
        <template #icon>
          <wolf mirror height="5rem" width="5rem" />
        </template>
      </link-button>
      <button
        v-if="smallScreen"
        id="openMenu"
        type="button"
        aria-label="Open menu"
        :class="isMenuOpen ? $style.noDisplay : $style.burgerMenu"
        @click="openMenu"
      >
        <burger height="3rem" width="3rem" />
      </button>
      <template v-else>
        <link-button to="/#who" text="Who?" />
        <link-button to="/#previously" text="Previously" />
        <link-button to="/ramblings" text="Blog" />
        <link-button to="/#reviews" text="Working with Leda" />
        <link-button to="/#contact" text="Contact" />
        <link-button
          text="CV"
          variant="primary"
          to="resume.pdf"
          target="_blank"
          download="resume.pdf"
        />
      </template>
    </div>
    <div
      v-if="isMenuOpen"
      :class="[$style.sidebar, isMenuOpen && $style.open]"
      :aria-hidden="!isMenuOpen"
      :tabindex="isMenuOpen ? 1 : -1"
    >
      <nav ref="outsideRef" :class="$style.sideNavigation">
        <link-button
          :class="$style.sideNavigationLink"
          to="/#who"
          text="Who?"
        />
        <link-button
          :class="$style.sideNavigationLink"
          to="/#previously"
          text="Previously"
        />
        <link-button
          :class="$style.sideNavigationLink"
          to="/ramblings"
          text="Blog"
        />
        <link-button
          :class="$style.sideNavigationLink"
          to="/#reviews"
          text="Working with Leda"
        />
        <link-button
          :class="$style.sideNavigationLink"
          to="/#contact"
          text="Contact"
        />
        <link-button
          :class="$style.sideNavigationLink"
          text="CV"
          to="resume.pdf"
          target="_blank"
          download="resume.pdf"
        />
      </nav>
      <div :class="[$style.backdrop, isMenuOpen && $style.backdropBlock]" />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

import LinkButton from '~/components/base/link-button.vue'
import Burger from '~/components/svg/burger.vue'
import Wolf from '~/components/svg/wolf.vue'

const smallScreen = useMediaQuery('(max-width: 1030px)')

const isMenuOpen = ref(false)
const outsideRef = ref(null)

function openMenu() {
  isMenuOpen.value = true
}

function closeMenu() {
  isMenuOpen.value = false
}

onClickOutside(outsideRef, closeMenu)
defineExpose({
  isMenuOpen,
})
</script>

<style module>
.navigation {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  max-width: var(--page-width);
  padding-bottom: 1rem;
  width: 100%;

  @media (max-width: 1030px) {
    padding-left: 0;
  }

  svg:hover {
    fill: var(--primary-color);
  }
}

.links {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  margin: 0 auto;
  max-width: var(--page-width);
  padding: var(--page-padding);
  width: 100%;

  @media (max-width: 1030px) {
    padding-left: 0;
  }

  svg:hover {
    fill: var(--primary-color);
  }
}

.burgerMenu {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 2rem;
  justify-content: space-around;
  padding: 0;
  width: 2rem;
  z-index: 12;
}

.noDisplay {
  display: none;
}

.sidebar {
  bottom: 0;
  display: block;
  height: 100vh;
  outline: 0;
  position: fixed;
  right: 0;
  top: 0;
  visibility: hidden;
  width: 100%;
}

.open {
  transform: translateX(0);
  visibility: visible;
}

.sideNavigation {
  background: var(--background-color);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  padding: 2rem;
  position: relative;
  right: 0;
  text-align: left;
  width: 50vw;
  z-index: 10;
}

.backdrop {
  position: fixed;
  z-index: 9;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  backdrop-filter: brightness(10%) blur(4px);
  -webkit-backdrop-filter: brightness(10%) blur(10px);
  display: none;
  overflow: hidden;
  pointer-events: none;
  user-select: none;
}

.backdropBlock {
  display: block;
}

.sideNavigationLink {
  color: var(--primary-color);
  padding: 2rem 1rem;
  text-align: center;
  font-size: large;
}
</style>
