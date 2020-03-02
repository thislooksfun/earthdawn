<template>
  <div class="character-characteristics">
    <value-label-group outlined label="Defense" class="defense-group">
      <div class="defense">
        <step-item
          v-for="(val, def) in chars.defense"
          :key="`defense-${def}`"
          :label="sCap(def)"
          :step="val"
          :class="def"
        />
      </div>
    </value-label-group>

    <value-label-group outlined label="Armor" class="armor-group">
      <div class="armor">
        <step-item
          v-for="(val, arm) in chars.armor"
          :key="`armor-${arm}`"
          :label="sCap(arm)"
          :step="val"
          :class="arm"
        />
      </div>
    </value-label-group>

    <value-label-group outlined label="Shield" class="shield-group">
      <div class="shield">
        <step-item
          v-for="(val, shd) in chars.shield"
          :key="`armor-${shd}`"
          :label="sCap(shd)"
          :step="val"
          :class="shd"
        />
      </div>
    </value-label-group>

    <!-- <div
      v-for="(vals, ch) in chars"
      :key="attr"
      :class="`centered val-label-group attr ${attr}`"
    >
      <span class="label">{{ attr }}</span> -->
    <!-- <span
        class="value"
        :title="`${attr} value: ${vals.val}; step: ${vals.step}`"
        v-b-tooltip.hover.right
        >{{ vals.step }}
      </span> -->
    <!-- </div> -->
  </div>
</template>

<script>
import decorate from "@/charDecorator";
import upperFirst from "lodash/upperFirst";
import StepItem from "../helper/StepItem";

export default {
  components: {
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
    sCap(s) {
      return upperFirst(s.toLowerCase());
    },
  },
  computed: {
    dChar() {
      return decorate(this.char);
    },
    chars() {
      return this.dChar.characteristics;
    },
  },
};
</script>

<style scoped lang="scss">
.character-characteristics {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  grid-template-areas: "defense-group armor-group shield-group";
  grid-gap: 1rem;

  .defense {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto;
    grid-template-areas: "physical mystic social";
  }
  .armor,
  .shield {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto;
    grid-template-areas: "physical mystic";
  }

  @each $area in defense-group, armor-group, shield-group {
    .#{$area} {
      grid-area: $area;
    }
  }
}
</style>
