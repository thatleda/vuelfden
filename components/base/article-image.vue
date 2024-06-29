<template>
  <div :class="$style.frame">
    <sanity-image
      :asset-id="props.asset._ref"
      :alt="props.alt"
      :class="$style.photo"
      loading="lazy"
      auto="format"
    />
  </div>
</template>

<script lang="ts" setup>
import type { SanityLinkedImage } from '~/@types/sanity'

const props = defineProps<SanityLinkedImage>()
</script>

<style module>
.frame {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.photo {
  width: 80vw;
}
</style>
