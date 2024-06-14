<template>
  <div :class="$style.card">
    <SanityImage
      :asset-id="data[0].banner.asset._ref"
      :class="$style.photo"
      width="200"
    ></SanityImage>
    <div>
      <SanityContent :blocks="data[0].content" />
    </div>
  </div>
</template>

<script setup>
const query = groq`*[_type == "page" && slug.current == $slug][0..10]`;
const { data } = useSanityQuery(query, { slug: "who" });
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
