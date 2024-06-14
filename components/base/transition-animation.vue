<script setup>
import { UseElementVisibility } from "@vueuse/components";

const props = defineProps({ animationName: { default: "fade", type: String } });
</script>

<template>
  <UseElementVisibility v-slot="{ isVisible }">
    <Transition :name="props.animationName">
      <div v-if="isVisible">
        <slot />
      </div>
    </Transition>
  </UseElementVisibility>
</template>

<style scoped>
.fade-enter-active {
  animation: fade-in 1s;
}
.fade-leave-active {
  animation: fade-in 1s reverse;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
