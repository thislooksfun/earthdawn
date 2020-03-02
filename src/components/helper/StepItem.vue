<template>
  <value-label-group
    centered
    :label="label"
    :title="[`step: ${step}`, ...ttrows].join('<br />')"
    v-b-tooltip.html
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
    ttrows: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
