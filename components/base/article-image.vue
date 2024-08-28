<template>
  <div :class="$style.frame">
    <NuxtImg
      :src="props.asset._ref"
      :alt="props.alt"
      :class="$style.photo"
      loading="lazy"
    />
  </div>
</template>

<script lang="ts" setup>
import type { SanityBlockImage } from '~/@types/sanity'

const props = defineProps<SanityBlockImage>()
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
