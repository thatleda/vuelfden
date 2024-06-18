<template>
  <div :class="$style.card">
    <div :class="$style.frame">
      <sanity-image
        :asset-id="aboutPage.banner.asset._ref"
        :alt="aboutPage.banner.alt"
        w="300"
        fit="crop"
        :class="$style.photo"
      />
    </div>
    <sanity-block :blocks="aboutPage.content" />
  </div>
</template>

<script lang="ts" setup>
import type { SanityPage } from "~/@types/sanity";

import SanityBlock from "~/components/base/sanity-block.vue";

interface AboutLedaProps {
  aboutPage: SanityPage;
}
const { aboutPage } = defineProps<AboutLedaProps>();
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
  max-width: 200px;

  @media (max-width: 749px) {
    max-width: auto;
  }
}
</style>
