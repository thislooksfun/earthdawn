<template>
  <value-label-group
    centered
    :label="label"
    :value="value"
    :title="[`value: ${value}`, ...ttrows].join('<br />')"
    v-b-tooltip.html
  />
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
