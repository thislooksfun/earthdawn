<template>
  <value-label-group
    :label="label"
    :value="value"
    :size="size"
    :ttrows="[`value: ${value}`, ...ttrows]"
  />
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    value: { type: Number, required: true },
    size: { type: String, default: null },
    ttrows: { type: Array, default: () => [] },
  },
};
</script>
