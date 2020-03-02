<template>
  <div class="character-attrs">
    <step-value-item
      v-for="(vals, attr) in attrs"
      :key="attr"
      :class="attr"
      :label="attr.toUpperCase()"
      :step="vals.step"
      :value="vals.val"
      :ttrows="ttRowsFor(attr)"
    />

    <value-label-group
      centered
      size="large"
      label="Speed"
      :value="chars.movementRate"
      class="speed"
    />
    <step-item label="Initiative" :step="chars.initiative" class="init" />
  </div>
</template>

<script>
import decorate from "@/charDecorator";
import StepValueItem from "../helper/StepValueItem";
import StepItem from "../helper/StepValueItem";

export default {
  components: {
    StepValueItem,
    StepItem,
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
  methods: {
    ttRowsFor(attr) {
      switch (attr) {
        case "str":
          return [`Carrying Capacity: ${this.chars.carryingCapacity}`];
        default:
          return [];
      }
    },
  },
  computed: {
    dChar() {
      return decorate(this.char);
    },
    attrs() {
      return this.dChar.attrs;
    },
    chars() {
      return this.dChar.characteristics;
    },
  },
};
</script>

<style scoped lang="scss">
.character-attrs {
  display: grid;
  grid-template-columns: repeat(8, auto);
  grid-template-rows: auto;
  grid-template-areas: "dex str tou per wil cha speed init";
  align-items: center;
  height: 100%;

  // TODO: Tune these breakpoints
  @media screen and (max-width: 50rem) {
    grid-template-columns: auto auto;
    grid-template-rows: repeat(4, auto);
    grid-template-areas: "dex per" "str wil" "tou cha" "speed init";
  }
  @media screen and (max-width: 25rem) {
    grid-template-columns: auto;
    grid-template-rows: repeat(8, auto);
    grid-template-areas: "dex" "str" "tou" "per" "wil" "cha" "speed" "init";
  }

  @each $area in dex, str, tou, per, wil, cha, speed, init {
    .#{$area} {
      grid-area: $area;
    }
  }

  .speed {
    border-left: 1px solid var(--table-primary);
  }
}
</style>
