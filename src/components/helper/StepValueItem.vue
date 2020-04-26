<template>
  <value-label-group
    :label="label"
    :value="step"
    :size="size"
    :ttrows="[`value: ${value}`, `step: ${step} (dice: ${d4s})`, ...ttrows]"
  />
</template>

<script>
import d4s from "@/helper/actionDiceForStep";

export default {
  props: {
    label: { type: String, required: true },
    value: { type: Number, required: true },
    step: { type: Number, required: true },
    size: { type: String, default: null },
    ttrows: { type: Array, default: () => [] },
  },
  computed: {
    d4s() {
      return d4s(this.step);
    },
  },
};
</script>
