<template>
  <value-label-group
    centered
    :label="label"
    :value="value"
    :size="size"
    :title="[`value: ${value}`, ...ttrows].join('<br />')"
    v-b-tooltip.html
  />
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    value: { type: Number, required: true },
    size: { type: String, default: "large" },
    ttrows: { type: Array, default: () => [] },
  },
};
</script>
