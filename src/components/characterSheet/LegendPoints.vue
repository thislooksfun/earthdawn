<template>
  <div class="legend-points">
    <value-label-group
      centered
      label="Legend Points"
      :title="`Current: ${lp.current}<br />Total: ${lp.total}`"
      v-b-tooltip.html
      >{{ lp.current }}</value-label-group
    >
  </div>
</template>

<script>
import decorate from "@/charDecorator";

export default {
  props: {
    uuid: {
      type: String,
      default: null,
    },
  },
  data() {
    const char = this.$store.state.Characters.characters[this.uuid];
    return { char };
  },
  computed: {
    dChar() {
      return decorate(this.char);
    },
    lp() {
      return this.dChar.legendPoints;
    },
  },
};
</script>
