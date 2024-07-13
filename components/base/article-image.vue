<template>
  <div :class="$style.frame">
    <NuxtImg
      :src="props._id"
      :alt="props.altText"
      :class="$style.photo"
      loading="lazy"
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
