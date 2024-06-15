<template>
  <NuxtLink
    :class="[
      props.variant === 'primary' && $style.primary,
      props.variant === 'secondary' && $style.secondary,
      $style.button,
    ]"
    v-bind="props"
  >
    <slot />
    {{ props.text }}</NuxtLink
  >
</template>

<script setup lang="ts">
import type { NuxtLinkProps } from "#app";

interface ButtonsProps extends NuxtLinkProps {
  text: string;
  variant?: "primary" | "secondary";
}

const props = withDefaults(defineProps<ButtonsProps>(), {
  download: undefined,
  icon: undefined,
  to: "/",
  variant: undefined,
});
</script>

<style module>
.button {
  padding-bottom: 0.5rem;
  padding: 0.5rem 1.5rem;
  width: auto;
  height: auto;
  transition: 0.25s ease-in-out;
  transition-property: background-color;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.primary,
.secondary {
  border-radius: var(--border-radius);
}

.primary {
  background-color: var(--text-color);
  color: var(--background-color);
  border-color: var(--box-shadow-color);
  font-weight: 600;

  &.hover {
    border-color: var(--box-shadow-hover-color);
    background-color: var(--background-color);
  }
}

.secondary {
  color: var(--text-color);
  background-color: var(--box-shadow-color);

  &:hover {
    background-color: var(--secondary-color);
    color: var(--primary-color);
    svg {
      fill: var(--primary-color);
    }
  }
}
</style>
