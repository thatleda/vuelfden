<template>
  <div :class="$style.card">
    <div :class="$style.frame">
      <NuxtImg
        :src="aboutPage.banner._id"
        :alt="aboutPage.banner.altText"
        :aria-label="aboutPage.banner.altText"
        width="200"
        loading="lazy"
        :class="$style.image"
      />
    </div>
    <base-sanity-block :blocks="aboutPage.content" />
  </div>
</template>

<script lang="ts" setup>
import type { SanityPage } from '~/@types/sanity';

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

.image {
  border-radius: var(--border-radius);
}

.frame {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
