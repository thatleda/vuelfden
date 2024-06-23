<template>
  <nav :class="$style.navigation">
    <div :class="$style.links">
      <base-link-button to="/" title="Home">
        <svg-wolf mirror height="5rem" width="5rem" />
      </base-link-button>
      <button
        v-if="smallScreen"
        id="openMenu"
        type="button"
        aria-label="Open menu"
        :class="isMenuOpen ? $style.noDisplay : $style.burgerMenu"
        @click="openMenu"
      >
        <svg-burger height="3rem" width="3rem" />
      </button>
      <template v-else>
        <base-link-button to="/#who">
          Who?
        </base-link-button>
        <base-link-button to="/#previously">
          Previously
        </base-link-button>
        <base-link-button to="/ramblings">
          Blog
        </base-link-button>
        <base-link-button to="/#reviews">
          Working with Leda
        </base-link-button>
        <base-link-button to="/#contact">
          Contact
        </base-link-button>
        <base-link-button
          variant="primary"
          to="resume.pdf"
          target="_blank"
          download="resume.pdf"
        >
          CV
        </base-link-button>
      </template>
    </div>
    <div
      v-if="isMenuOpen"
      :class="[$style.sidebar, isMenuOpen && $style.open]"
      :aria-hidden="!isMenuOpen"
      :tabindex="isMenuOpen ? 1 : -1"
    >
      <nav ref="outsideRef" :class="$style.sideNavigation">
        <base-link-button
          :class="$style.sideNavigationLink"
          to="/#who"
          :onclick="closeMenu"
        >
          Who?
        </base-link-button>
        <base-link-button
          :class="$style.sideNavigationLink"
          to="/#previously"
          :onclick="closeMenu"
        >
          Previously
        </base-link-button>
        <base-link-button
          :class="$style.sideNavigationLink"
          to="/ramblings"
          :onclick="closeMenu"
        >
          Blog
        </base-link-button>
        <base-link-button
          :class="$style.sideNavigationLink"
          to="/#reviews"
          :onclick="closeMenu"
        >
          Working with Leda
        </base-link-button>

        <base-link-button
          :class="$style.sideNavigationLink"
          to="/#contact"
          :onclick="closeMenu"
        >
          Contact
        </base-link-button>
        <base-link-button
          :class="$style.sideNavigationLink"
          to="resume.pdf"
          target="_blank"
          download="resume.pdf"
        >
          CV
        </base-link-button>
      </nav>
      <div :class="[$style.backdrop, isMenuOpen && $style.backdropBlock]" />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

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
  width: 65vw;
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
  -webkit-backdrop-filter: brightness(10%) blur(4px);
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
