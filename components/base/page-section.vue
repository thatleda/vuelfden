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
        <h2 v-if="props.heading" :class="$style.heading">
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
import type { AnimationProps } from '~/components/base/transition-animation.vue';

interface SectionProps {
  anchor?: string
  animationProps?: Partial<AnimationProps>
  heading?: null | string
}

const props = defineProps<SectionProps>()
</script>

<style module>
h2.heading {
  margin: auto;
  padding-top: 2rem;
}

.section {
  width: 64rem;
  max-width: calc(100vw - 2rem);
  height: auto;
  background: var(--background-color);
  border-radius: var(--border-radius);
  scroll-margin-top: 60px;
  padding: var(--page-padding);
  margin: 0 auto 4rem auto;
  position: relative;
  z-index: 1;

  @media (max-width: 749px) {
    width: 100%;
    margin: 0 auto 2rem auto;
    padding-bottom: 2rem;
  }
}

.wrapper {
  height: 100%;
  max-width: var(--page-width);
  margin: 0 auto 0 auto;
  padding: var(--page-padding);
  position: relative;
  z-index: 2;

  @media (max-width: 749px) {
    padding: 0;
  }
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
  border-radius: var(--border-radius);
  position: relative;
  z-index: 3;
}
</style>
