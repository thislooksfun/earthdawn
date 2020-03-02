<template>
  <value-label-group
    centered
    :label="label"
    :title="[`step: ${step} (dice: ${d4s})`, ...ttrows].join('<br />')"
    v-b-tooltip.html
    >{{ step }}</value-label-group
  >
</template>

<script>
import d4s from "@/helper/actionDiceForStep";

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
  computed: {
    d4s() {
      return d4s(this.step);
    },
  },
};
</script>
