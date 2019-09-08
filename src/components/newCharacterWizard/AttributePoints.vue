<template>
  <div class="attribute-points">
    <div class="radiogroup">
      <span class="label">DEX:</span>

      <label
        v-for="mod in modifiers"
        :key="mod.effect"
        class="inline"
        v-b-tooltip.hover.down
        :title="mod.humanCost"
      >
        <input
          type="radio"
          name="dexmod"
          :value="mod.effect"
          :disabled="costs[mod.effect] > (attributePoints + costs[dexMod])"
          v-model="dexMod"
        />
        {{mod.humanEffect}}
        <!-- TODO: Convert all labels over to this form (with buttons and hidden <input>s) -->
        <!-- <base-button
          size="sm"
          :type="dexMod == mod.effect ? 'primary' : 'secondary'"
          @click.passive="console.log('click')"
        >{{mod.humanEffect}}</base-button>-->
      </label>
    </div>

    <div class="radiogroup">
      <span class="label">STR:</span>

      <label
        v-for="mod in modifiers"
        :key="mod.effect"
        class="inline"
        v-b-tooltip.hover.down
        :title="mod.humanCost"
      >
        <input
          type="radio"
          name="strmod"
          :value="mod.effect"
          :disabled="costs[mod.effect] > (attributePoints + costs[strMod])"
          v-model="strMod"
        />
        {{mod.humanEffect}}
      </label>
    </div>

    <div class="radiogroup">
      <span class="label">TOU:</span>

      <label
        v-for="mod in modifiers"
        :key="mod.effect"
        class="inline"
        v-b-tooltip.hover.down
        :title="mod.humanCost"
      >
        <input
          type="radio"
          name="toumod"
          :value="mod.effect"
          :disabled="costs[mod.effect] > (attributePoints + costs[touMod])"
          v-model="touMod"
        />
        {{mod.humanEffect}}
      </label>
    </div>

    <div class="radiogroup">
      <span class="label">PER:</span>

      <label
        v-for="mod in modifiers"
        :key="mod.effect"
        class="inline"
        v-b-tooltip.hover.down
        :title="mod.humanCost"
      >
        <input
          type="radio"
          name="permod"
          :value="mod.effect"
          :disabled="costs[mod.effect] > (attributePoints + costs[perMod])"
          v-model="perMod"
        />
        {{mod.humanEffect}}
      </label>
    </div>

    <div class="radiogroup">
      <span class="label">WIL:</span>

      <label
        v-for="mod in modifiers"
        :key="mod.effect"
        class="inline"
        v-b-tooltip.hover.down
        :title="mod.humanCost"
      >
        <input
          type="radio"
          name="wilmod"
          :value="mod.effect"
          :disabled="costs[mod.effect] > (attributePoints + costs[wilMod])"
          v-model="wilMod"
        />
        {{mod.humanEffect}}
      </label>
    </div>

    <div class="radiogroup">
      <span class="label">CHA:</span>

      <label
        v-for="mod in modifiers"
        :key="mod.effect"
        class="inline"
        v-b-tooltip.hover.down
        :title="mod.humanCost"
      >
        <input
          type="radio"
          name="chamod"
          :value="mod.effect"
          :disabled="costs[mod.effect] > (attributePoints + costs[chaMod])"
          v-model="chaMod"
        />
        {{mod.humanEffect}}
      </label>
    </div>
    Attribute Points: {{attributePoints}}
    dex: {{currentAttrs.dex.val}}
    str: {{currentAttrs.str.val}}
    effects: {{char['effects!']}}
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
    return {
      char,
      modifiers: [
        {
          effect: -2,
          humanEffect: "-2",
          humanCost: "Gain +2 Attribute Points",
        },
        { effect: -1, humanEffect: "-1", humanCost: "Gain +1 Attribute Point" },
        { effect: 0, humanEffect: "+0", humanCost: "Costs 0 Attribute Points" },
        { effect: 1, humanEffect: "+1", humanCost: "Costs 1 Attribute Point" },
        { effect: 2, humanEffect: "+2", humanCost: "Costs 2 Attribute Points" },
        { effect: 3, humanEffect: "+3", humanCost: "Costs 3 Attribute Points" },
        { effect: 4, humanEffect: "+4", humanCost: "Costs 5 Attribute Points" },
        { effect: 5, humanEffect: "+5", humanCost: "Costs 7 Attribute Points" },
        { effect: 6, humanEffect: "+6", humanCost: "Costs 9 Attribute Points" },
        {
          effect: 7,
          humanEffect: "+7",
          humanCost: "Costs 12 Attribute Points",
        },
        {
          effect: 8,
          humanEffect: "+8",
          humanCost: "Costs 15 Attribute Points",
        },
      ],
      costs: {
        "-2": -2,
        "-1": -1,
        "0": 0,
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 5,
        "5": 7,
        "6": 9,
        "7": 12,
        "8": 15,
      },
    };
  },
  methods: {
    addEffectAndEmit({ name, value }) {
      this.$store.dispatch("ccAddEffect", { name, value });
      this.$emit("completed", this.attributePoints >= 0);
    },
  },
  computed: {
    dexMod: {
      get() {
        return this.currentAttrs.dex.val - this.baseAttrs.dex;
      },
      set(value) {
        this.addEffectAndEmit({ name: "dexVal", value });
      },
    },
    strMod: {
      get() {
        return this.currentAttrs.str.val - this.baseAttrs.str;
      },
      set(value) {
        this.addEffectAndEmit({ name: "strVal", value });
      },
    },
    touMod: {
      get() {
        return this.currentAttrs.tou.val - this.baseAttrs.tou;
      },
      set(value) {
        this.addEffectAndEmit({ name: "touVal", value });
      },
    },
    perMod: {
      get() {
        return this.currentAttrs.per.val - this.baseAttrs.per;
      },
      set(value) {
        this.addEffectAndEmit({ name: "perVal", value });
      },
    },
    wilMod: {
      get() {
        return this.currentAttrs.wil.val - this.baseAttrs.wil;
      },
      set(value) {
        this.addEffectAndEmit({ name: "wilVal", value });
      },
    },
    chaMod: {
      get() {
        return this.currentAttrs.cha.val - this.baseAttrs.cha;
      },
      set(value) {
        this.addEffectAndEmit({ name: "chaVal", value });
      },
    },

    attributePoints() {
      return (
        25 -
        this.costs[this.dexMod] -
        this.costs[this.strMod] -
        this.costs[this.touMod] -
        this.costs[this.perMod] -
        this.costs[this.wilMod] -
        this.costs[this.chaMod]
      );
    },
    dChar() {
      return decorate(this.char);
    },
    baseAttrs() {
      return this.dChar.race.baseStats.attrs;
    },
    currentAttrs() {
      return this.dChar.attrs;
    },
  },
  // This stage is complete from the start
  mounted() {
    this.$emit("completed", this.attributePoints >= 0);
  },
};
</script>

<style scoped lang="scss">
.attribute-points {
  .radiogroup {
    label {
      margin-left: 0.5rem;

      input[type="radio"] {
        // position: absolute;
        // opacity: 0;
        // cursor: pointer;
        // height: 0;
        // width: 0;
      }

      input[type="radio"] {
        & ~ .radio-block {
          background-color: blue;
        }

        &:checked ~ .radio-block {
          color: red;
        }
      }
    }
  }
}
</style>