<template>
  <div class="character-attrs">
    <div
      v-for="(vals, attr) in attrs"
      :key="attr"
      class="solid padded block attr"
    >
      <span class="name">{{ attr }}</span>
      <span
        class="step"
        :title="`${attr} value: ${vals.val}; step: ${vals.step}`"
        v-b-tooltip.hover.right
        >{{ vals.step }}
      </span>
    </div>
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
    attrs() {
      return this.dChar.attrs;
    },
  },
};
</script>

<style scoped lang="scss">
.attr {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  grid-template-areas: "name" "step";
  text-align: center;

  .name {
    margin: -0.5rem;

    grid-area: name;
    color: var(--text-secondary);
    font-size: 0.85rem;
    text-transform: uppercase;
  }

  .step {
    margin-top: 0.25rem;
    margin-bottom: -0.5rem;
    grid-area: step;
    font-size: 2rem;
  }
}
</style>
