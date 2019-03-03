<template lang="html">
  <svg viewBox="0 0 32 32" :style="{'background': secondary}">
    <circle r="16" cx="16" cy="16" class='pie' :style="{'stroke-dasharray': chance +' 100', 'stroke': primary, 'fill': secondary}"/>
    <circle r='4' cx="16" cy="16" class='pin'/>
    <rect x="16" y="16" width="4" height="4" :transform="'rotate('+(result*360-45)+')'"/>
  </svg>
</template>

<script>
export default {
  //:transform="'rotate('+(result*360-45)+', 16, 16)'"
  name: 'spinner',
  props: {
    chance: {
      type: Number,
      required: true,
    },
    result: {
      type: Number,
      required: true,
    },
    primary: {
      type: String,
      default: '#2196F3',
    },
    secondary: {
      type: String,
      default: '#ECEFF1',
    },
  }
}
</script>

<style lang="css" scoped>
@keyframes spin {
  from { transform: rotate(-3600deg); }
}

svg {
  width: 100%;
  transform: rotate(-90deg);
  border-radius: 50%;
}
circle.pie {
  stroke-width: 32;
}
circle.pin {
  fill: black;
}
rect {
  transform-origin: 50% 50%;
  animation: spin 4s cubic-bezier(0.22, 0.61, 0.36, 1);
  fill: black;
}
</style>
