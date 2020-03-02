<template>
  <div class="character-attrs">
    <div
      v-for="(vals, attr) in attrs"
      :key="attr"
      class="centered val-label-group attr"
    >
      <span class="label">{{ attr }}</span>
      <span
        class="value"
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

    &.dex {
      grid-area: dex;
    }
    &.str {
      grid-area: str;
    }
    &.tou {
      grid-area: tou;
    }
    &.per {
      grid-area: per;
    }
    &.wil {
      grid-area: wil;
    }
    &.cha {
      grid-area: cha;
    }

    .label {
      text-transform: uppercase;
    }
  }
}
</style>
