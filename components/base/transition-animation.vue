<template>
  <UseElementVisibility v-slot="{ isVisible }">
    <div v-show="isVisible" :style="props" :class="props.class">
      <slot />
    </div>
  </UseElementVisibility>
</template>

<script setup lang="ts">
import { UseElementVisibility } from "@vueuse/components";

type TimeUnit = "ms" | "s";

export interface AnimationProps {
  animationDelay?: `${number}${TimeUnit}`;
  animationDuration: `${number}${TimeUnit}`;
  animationFillMode?: "backwards" | "both" | "forwards" | "none";
  animationName:
    | "fade-down"
    | "fade-in"
    | "fade-left"
    | "fade-up"
    | "scale-in"
    | "wiggle";
  animationTiming: "ease-in" | "ease-in-out" | "ease-out" | "linear";
  class?: string;
}

const props = withDefaults(defineProps<AnimationProps>(), {
  animationDelay: undefined,
  animationDuration: "1s",
  animationFillMode: "backwards",
  animationName: "fade-in",
  animationTiming: "ease-in",
  class: "",
});
</script>
