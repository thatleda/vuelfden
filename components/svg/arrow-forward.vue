<template>
  <svg
    :style="{ height, width }"
    v-bind="svgAttributes"
    viewBox="0 -960 960 960"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Arrow forward icon</title>
    <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
  </svg>
</template>

<script lang="ts" setup>
import type { SVGProps } from '~/@types/svg'

const { height, width, ...svgAttributes } = withDefaults(defineProps<SVGProps>(), {
  height: '1rem',
  width: '1rem',
})
</script>
