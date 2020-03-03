<template>
  <div class="legend-points">
    <value-label-group
      label="Legend Points"
      :value="lp.current"
      :ttrows="[`Current: ${lp.current}`, `Total: ${lp.total}`]"
    />
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
