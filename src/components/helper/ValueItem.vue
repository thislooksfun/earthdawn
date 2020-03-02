<template>
  <value-label-group
    centered
    :label="label"
    :title="[`value: ${value}`, ...ttrows].join('<br />')"
    v-b-tooltip.html
    >{{ value }}</value-label-group
  >
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    value: { type: Number, required: true },
    ttrows: { type: Array, default: () => [] },
  },
};
</script>
