<template>
  <div class="character-attrs">
    <step-value-item
      v-for="(vals, attr) in attrs"
      :key="attr"
      :class="attr"
      :label="attr.toUpperCase()"
      :step="vals.step"
      :value="vals.val"
    />
  </div>
</template>

<script>
import decorate from "@/charDecorator";
import StepValueItem from "../helper/StepValueItem";

export default {
  components: {
    StepValueItem,
  },
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
.character-attrs {
  display: grid;
  grid-template-columns: repeat(6, auto);
  grid-template-rows: auto;
  grid-template-areas: "dex str tou per wil cha";
  align-items: center;
  height: 100%;

  // TODO: Tune these breakpoints
  @media screen and (max-width: 50rem) {
    grid-template-columns: auto auto;
    grid-template-rows: repeat(3, auto);
    grid-template-areas: "dex per" "str wil" "tou cha";
  }
  @media screen and (max-width: 25rem) {
    grid-template-columns: auto;
    grid-template-rows: repeat(6, auto);
    grid-template-areas: "dex" "str" "tou" "per" "wil" "cha";
  }

  .attr {
    background-color: var(--background-primary);

    @each $area in dex, str, tou, per, wil, cha {
      &.#{$area} {
        grid-area: $area;
      }
    }

    .label {
      text-transform: uppercase;
    }
  }
}
</style>
