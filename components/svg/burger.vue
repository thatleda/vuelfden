<template>
  <svg
    :style="{ height, width }"
    v-bind="svgAttributes"
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
import type { SVGProps } from '~/@types/svg'

const { height = '1rem', width = '1rem', ...svgAttributes } = defineProps<SVGProps>()
</script>
