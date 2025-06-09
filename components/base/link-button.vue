<template>
  <NuxtLink
    :class="[
      variant === 'primary' && $style.primary,
      variant === 'secondary' && $style.secondary,
      $style.button,
    ]"
    v-bind="nuxtLinkProps"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { NuxtLinkProps } from '#app'

export interface ButtonProps extends NuxtLinkProps {
  variant?: 'primary' | 'secondary'
}

const { to = '/', variant, prefetch = true } = defineProps<ButtonProps>()

const nuxtLinkProps = to.toString().startsWith('/')
  ? { to, variant, prefetch }
  : {
      to,
      variant,
      prefetch,
      external: true,
      target: '_blank',
    }
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
  user-select: none;
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

  &:hover {
    border-color: var(--box-shadow-hover-color);
    background-color: var(--primary-color);
    color: var(--background-color);
  }
}

.secondary {
  color: var(--text-color);
  background-color: var(--box-shadow-color);

  &:hover {
    background-color: var(--primary-color);
    color: var(--background-color);
    svg {
      fill: var(--background-color);
    }
  }
}
</style>
