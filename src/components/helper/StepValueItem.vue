<template>
  <value-label-group
    centered
    :label="label"
    :title="`value: ${value}; step: ${step}`"
    v-b-tooltip.hovers
    >{{ step }}</value-label-group
  >
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 0,
    },
  },
};
</script>
