<template>
  <div :class="$style.card">
    <sanity-image
      :asset-id="imageId"
      :class="$style.photo"
      auto="format"
      crop="center"
      fit="crop"
    />
    <sanity-block :blocks="props.content" />
  </div>
</template>

<script setup>
import SanityBlock from "~/components/base/sanity-block.vue";
const props = defineProps({
  content: { default: () => [], type: Array },
  imageId: { default: "", type: String },
});
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

.photo {
  margin: 0 auto;
  border-radius: var(--border-radius);
  max-width: 200px;
}
</style>
