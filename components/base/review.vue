<template>
  <div :class="$style.card">
    <div :class="$style.frame">
      <sanity-image
        :asset-id="review.picture.asset._ref"
        :alt="review.reviewer"
        :class="$style.picture"
        auto="format"
        crop="center"
        fit="crop"
        w="300"
        h="300"
        loading="lazy"
      />
    </div>

    <div :class="$style.text">
      <q lang="en" :class="$style.comment">{{ review.comment }}</q>
      <b :class="$style.reviewer">— {{ review.reviewer }}</b>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SanityReview } from '~/@types/sanity'

interface ReviewProps {
  review: SanityReview
}

const { review } = defineProps<ReviewProps>()
</script>

<style module>
.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  white-space: normal;
  padding: 2rem 0;

  @media (max-width: 700px) {
    flex-direction: column;
  }
}

.picture {
  border-radius: var(--border-radius);
  width: 200px;

  @media (max-width: 700px) {
    width: auto;
  }
}

.frame {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
}

.text {
  display: grid;
  width: 100%;
  padding-left: 2rem;

  @media (max-width: 700px) {
    display: grid;
    padding: 2rem 0;
  }
}

.comment {
  quotes: auto;
  font-style: italic;
  color: var(--text-color);
}

.reviewer {
  padding-top: 1rem;
  text-align: right;
}
</style>
