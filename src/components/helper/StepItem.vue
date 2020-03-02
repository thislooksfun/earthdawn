<template>
  <value-label-group
    centered
    :label="label"
    :title="`step: ${step}`"
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
    step: {
      type: Number,
      default: 0,
    },
  },
};
</script>
