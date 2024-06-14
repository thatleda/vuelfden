<template>
  <UseElementVisibility v-slot="{ isVisible }">
    <div v-show="isVisible" :style="props">
      <slot />
    </div>
  </UseElementVisibility>
</template>

<script setup lang="ts">
import { UseElementVisibility } from "@vueuse/components";
interface AnimationProps {
  animationDelay?: `${number}ms` | `${number}s`;
  animationDuration: `${number}ms` | `${number}s`;
  animationFillMode?: "backwards" | "both" | "forwards" | "none";
  animationName:
    | "fade-down"
    | "fade-in"
    | "fade-left"
    | "fade-up"
    | "scale-in"
    | "wiggle";
  animationTiming: "ease-in" | "ease-in-out" | "ease-out" | "linear";
}

const props = withDefaults(defineProps<AnimationProps>(), {
  animationDelay: undefined,
  animationDuration: "1s",
  animationFillMode: "backwards",
  animationName: "fade-in",
  animationTiming: "ease-in",
});
</script>

<style module>
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fade-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes fade-down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes fade-left {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}

@keyframes scale-in {
  0% {
    opacity: 0;
    transform: scaleY(0);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}

@keyframes wiggle {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
