<template>
  <base-transition-animation
    :animation-duration="props.animationProps?.animationDuration ?? '1s'"
    :animation-name="props.animationProps?.animationName ?? 'fade-up'"
    :animation-delay="props.animationProps?.animationDelay ?? '300ms'"
    :animation-fill-mode="props.animationProps?.animationFillMode"
    :animation-timing="props.animationProps?.animationTiming"
  >
    <section :id="props.anchor" :class="$style.section">
      <div :class="$style.wrapper">
        <h2 v-if="props.heading">
          {{ props.heading }}
        </h2>
        <div :class="$style.cards">
          <slot />
        </div>
      </div>
    </section>
  </base-transition-animation>
</template>

<script setup lang="ts">
import type { AnimationProps } from '~/components/base/transition-animation.vue'

interface SectionProps {
  anchor?: string
  animationProps?: Partial<AnimationProps>
  heading?: null | string
}

const props = defineProps<SectionProps>()
</script>

<style module>
.section {
  height: auto;
  background: var(--background-color);
  scroll-margin-top: 60px;
  padding: var(--page-padding);
  margin: 0 auto 4rem auto;

  @media (max-width: 749px) {
    margin: 0 auto 2rem auto;
    padding-bottom: 2rem;
  }
}

.wrapper {
  height: 100%;
  max-width: var(--page-width);
  margin: 0 auto 0 auto;
  padding: var(--page-padding);

  @media (max-width: 749px) {
    padding: 0;
  }
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
