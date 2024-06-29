<template>
  <div :class="$style.card">
    <div :class="$style.frame">
      <sanity-image
        :asset-id="aboutPage.banner.asset._ref"
        :alt="aboutPage.banner.alt"
        w="200"
        width="200"
        height="269"
        fit="crop"
        :class="$style.photo"
        loading="lazy"
        auto="format"
      />
    </div>
    <base-sanity-block :blocks="aboutPage.content" />
  </div>
</template>

<script lang="ts" setup>
import type { SanityPage } from '~/@types/sanity'

interface AboutLedaProps {
  aboutPage: SanityPage
}
const { aboutPage } = defineProps<AboutLedaProps>()
</script>

<style module>
.card {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  @media (max-width: 749px) {
    flex-direction: column;
  }
}

.frame {
  display: flex;
  justify-content: center;
  align-items: center;
}

.photo {
  border-radius: var(--border-radius);
}
</style>
