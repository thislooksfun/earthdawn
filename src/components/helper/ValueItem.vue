<template>
  <value-label-group
    centered
    :label="label"
    :title="`value: ${value}`"
    v-b-tooltip.hovers
    >{{ value }}</value-label-group
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
  },
};
</script>
