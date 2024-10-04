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

interface ButtonProps extends NuxtLinkProps {
  variant?: 'primary' | 'secondary'
  download?: boolean
}

const { download, to = '/', variant, prefetch = true } = defineProps<ButtonProps>()

const nuxtLinkProps = to.toString().startsWith('/')
  ? { download, to, variant, prefetch }
  : {
      download,
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
    background-color: var(--tertiary-color);
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
