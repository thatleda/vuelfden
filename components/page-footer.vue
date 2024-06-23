<template>
  <footer :class="$style.footer">
    <div :class="$style.linkWrapper">
      <link-button
        aria-label="Nuxt"
        to="https://nuxt.com/"
        target="_blank"
        text="-powered vanity"
      >
        <template #icon>
          <nuxt-logo />
        </template>
      </link-button>
      <nav :class="$style.footerNav">
        <link-button to="/privacy" text="Privacy" />
        <link-button to="/imprint" text="Imprint" />
      </nav>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import LinkButton from '~/components/base/link-button.vue'
import NuxtLogo from '~/components/svg/nuxt-logo.vue'
</script>

<style module>
.footer {
  background: var(--background-color);
  border-top: 3px solid var(--box-shadow-color);
}

.footerNav {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding-bottom: 0;
}

.linkWrapper {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: var(--page-width);
  padding: var(--page-padding);
}
</style>
