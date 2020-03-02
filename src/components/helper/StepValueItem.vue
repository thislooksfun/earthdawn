<template>
  <value-label-group
    centered
    :label="label"
    :title="
      [`value: ${value}`, `step: ${step} (dice: ${d4s})`, ...ttrows].join(
        '<br />'
      )
    "
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
    value: {
      type: Number,
      default: 0,
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
