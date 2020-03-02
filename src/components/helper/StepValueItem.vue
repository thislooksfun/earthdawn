<template>
  <value-label-group
    centered
    :label="label"
    :value="step"
    :size="size"
    :title="
      [`value: ${value}`, `step: ${step} (dice: ${d4s})`, ...ttrows].join(
        '<br />'
      )
    "
    v-b-tooltip.html
  />
</template>

<script>
import d4s from "@/helper/actionDiceForStep";

export default {
  props: {
    label: { type: String, required: true },
    value: { type: Number, required: true },
    step: { type: Number, required: true },
    size: { type: String, default: "large" },
    ttrows: { type: Array, default: () => [] },
  },
  computed: {
    d4s() {
      return d4s(this.step);
    },
  },
};
</script>
