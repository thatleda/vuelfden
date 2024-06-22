<template>
  <svg
    :style="{ ...props }"
    viewBox="0 -960 960 960"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Burger icon</title>
    <path
      d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"
    />
  </svg>
</template>

<script lang="ts" setup>
import type { SVGProps } from '.'

const props = withDefaults(defineProps<SVGProps>(), {
  height: '1rem',
  width: '1rem',
})
</script>
