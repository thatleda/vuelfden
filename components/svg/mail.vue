<template>
  <svg
    :style="{ height, width }"
    v-bind="svgAttributes"
    viewBox="0 -960 960 960"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Mail envelope icon</title>
    <path
      d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"
    />
  </svg>
</template>

<script lang="ts" setup>
import type { SVGProps } from '~/@types/svg'

const { height, width, ...svgAttributes } = withDefaults(defineProps<SVGProps>(), {
  height: '1rem',
  width: '1rem',
})
</script>
