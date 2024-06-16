<template>
  <div :class="$style.rightAligned">
    <sub>— <slot /></sub>
  </div>
</template>

<style module>
.rightAligned {
  text-align: right;
  padding: a0;
}
</style>
