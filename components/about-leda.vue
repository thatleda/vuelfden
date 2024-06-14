<template>
  <div :class="$style.card">
    <sanity-image :asset-id="imageId" :class="$style.photo" width="200" />
    <div>
      <sanity-content :blocks="props.content" />
    </div>
  </div>
</template>

<script setup>
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
}
</style>
