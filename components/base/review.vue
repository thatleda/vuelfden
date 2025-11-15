<template>
  <div :class="$style.card">
    <div :class="$style.frame">
      <NuxtImg
        :src="review.picture._id"
        :alt="review.picture.altText"
        :class="$style.picture"
        :aria-label="`${review.reviewer}'s portrait`"
        width="200"
        height="200"
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

  @media (max-width: 765px) {
    flex-direction: column;
  }
}

.picture {
  border-radius: var(--border-radius);
}

.frame {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  display: grid;
  width: 100%;
  padding-left: 2rem;

  @media (max-width: 765px) {
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
