<template>
  <div
    ref="target"
    :style="targetIsVisible ? props : { opacity: 0 }"
    :class="props.class"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core'

type TimeUnit = 'ms' | 's'

export interface AnimationProps {
  animationDelay?: `${number}${TimeUnit}`
  animationDuration?: `${number}${TimeUnit}`
  animationFillMode?: 'backwards' | 'both' | 'forwards' | 'none'
  animationName?:
    | 'fade-down'
    | 'fade-in'
    | 'fade-left'
    | 'fade-up'
    | 'scale-in'
    | 'wiggle'
  animationTiming?: 'ease-in' | 'ease-in-out' | 'ease-out' | 'linear'
  class?: string
}

const props = withDefaults(defineProps<AnimationProps>(), {
  animationDelay: undefined,
  animationDuration: '1s',
  animationFillMode: 'backwards',
  animationName: 'fade-in',
  animationTiming: 'ease-in',
  class: '',
})
const target = ref(null)
const targetIsVisible = useElementVisibility(target, { threshold: 0.05 })
</script>
