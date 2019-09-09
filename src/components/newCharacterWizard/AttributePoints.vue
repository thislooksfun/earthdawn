<template>
  <div class="attribute-points">
    <div class="labelled-row">
      <span class="label">Attribute Points:</span>
      <span class="value">25</span>
    </div>

    <!-- Attributes -->
    <div
      v-for="attrName in ['dex', 'str', 'tou', 'per', 'wil', 'cha']"
      :key="attrName"
      class="attribute"
    >
      <span class="attrname">{{ attrName.toUpperCase() }}:</span>
      <div class="attrbase">
        <span class="baselabel">Base:</span>
        <span class="baseval">{{ baseAttrs[attrName] }}</span>
      </div>

      <div class="radiogroup">
        <label
          v-for="mod in modifiers"
          :key="mod.effect"
          class="inline"
          :class="{
            toomuch:
              costs[mod.effect] > attributePoints + costs[mods[attrName]],
          }"
          v-b-tooltip.hover.down
          :title="mod.humanCost"
        >
          <input
            type="radio"
            :name="`${attrName}mod`"
            :value="mod.effect"
            :disabled="
              costs[mod.effect] > attributePoints + costs[mods[attrName]]
            "
            :checked="mods[attrName] == mod.effect"
            @change="addEffectAndEmit(attrName, mod.effect)"
          />
          {{ mod.humanEffect }}
          <!-- TODO: Convert all labels over to this form (with buttons and hidden <input>s) -->
          <!-- <base-button
            size="sm"
            :type="dexMod == mod.effect ? 'primary' : 'secondary'"
            @click.passive="console.log('click')"
          >{{mod.humanEffect}}</base-button>-->
        </label>
      </div>

      <div class="result">
        <span class="resultlabel">=</span>
        <span class="resultval">{{ currentAttrs[attrName].val }}</span>
      </div>

      <div class="cost">
        <span class="costmod">{{
          costs[mods[attrName]] >= 0 ? "-" : "+"
        }}</span>
        <span class="costval">{{ Math.abs(costs[mods[attrName]]) }}</span>
      </div>
    </div>

    <div class="labelled-row section-end">
      <div class="label">
        <span>Remaining Points:</span>
      </div>
      <span class="value">{{ attributePoints }}</span>
    </div>

    <div class="labelled-row">
      <span class="label">Base Karma:</span>
      <span class="value">{{ dChar.race.baseStats.karmaMod }}</span>
    </div>

    <div class="bottom labelled-row">
      <span class="label"
        >Max Karma:<sup
          v-b-tooltip.hover.top
          title="Any remaining Attribute Points increase your maximum karma."
          style="cursor: help"
          >?</sup
        ></span
      >
      <span class="value">{{ dChar.karma.max }}</span>
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
    const costs = {
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
    };

    const humanCostFor = v => {
      const c = costs[v];
      const ac = Math.abs(c);
      return `${c < 0 ? "Gain" : "Costs"} ${
        c < 0 ? "+" : ""
      }${ac} Attribute Point${ac != 1 ? "s" : ""}`;
    };
    const modifiers = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8].map(v => ({
      effect: v,
      humanEffect: `${v >= 0 ? "+" : ""}${v}`,
      humanCost: humanCostFor(v),
    }));

    return { modifiers, costs };
  },
  methods: {
    addEffectAndEmit(attrName, value) {
      this.$store.dispatch("ccAddEffect", { name: `${attrName}Val`, value });
      // Put leftover points into the max karma
      this.$store.dispatch("ccAddEffect", {
        name: "karmaMax",
        value: this.attributePoints,
      });
      this.$emit("completed", this.attributePoints >= 0);
    },
  },
  computed: {
    mods() {
      const mods = {};
      Object.keys(this.baseAttrs).forEach(
        a => (mods[a] = this.currentAttrs[a].val - this.baseAttrs[a])
      );
      return mods;
    },

    attributePoints() {
      return (
        25 -
        Object.keys(this.mods)
          .map(k => this.costs[this.mods[k]])
          .reduce((t, v) => t + v)
      );
    },
    char() {
      return this.$store.state.Characters.characters[this.uuid];
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
    // Put leftover points into the max karma
    this.$store.dispatch("ccAddEffect", {
      name: "karmaMax",
      value: this.attributePoints,
    });
    this.$emit("completed", this.attributePoints >= 0);
  },
};
</script>

<style scoped lang="scss">
.attribute-points {
  .labelled-row {
    grid-area: cost;

    border-bottom: 1px solid #aaa;
    &.section-end {
      border-bottom-width: 2px;
    }
    &.bottom {
      border-bottom: 0;
    }

    display: grid;
    grid-template-columns: auto 2.25rem;
    grid-template-rows: auto;
    grid-template-areas: "label value";

    .label {
      grid-area: label;
      display: inline-block;
      text-align: right;
      padding-right: 0.5rem;
    }
    .value {
      border-left: 1px solid #aaa;

      grid-area: value;
      display: inline-block;
      text-align: right;
    }
  }

  .attribute {
    line-height: 2.25rem;

    display: grid;
    grid-template-columns: 3rem 4.15rem auto 2.5rem 2.25rem;
    grid-template-rows: auto;
    grid-template-areas: "attrname attrbase main result cost";

    border-bottom: 1px solid #aaa;

    .attrname {
      grid-area: attrname;
    }

    .attrbase {
      grid-area: attrbase;

      display: grid;
      grid-template-columns: 2.65rem 1.25rem;
      grid-template-rows: auto;
      grid-template-areas: "baselabel baseval";

      .baselabel {
        grid-area: baselabel;
        display: inline-block;
        text-align: left;
      }
      .baseval {
        grid-area: baseval;
        display: inline-block;
        text-align: right;
      }
    }

    .radiogroup {
      grid-area: main;

      label {
        margin-left: 0.5rem;
        margin-bottom: 0;

        &.toomuch {
          color: red;
        }

        // TODO: Implement this at some point
        // input[type="radio"] {
        //   position: absolute;
        //   opacity: 0;
        //   cursor: pointer;
        //   height: 0;
        //   width: 0;

        //   & ~ .radio-block {
        //     background-color: blue;
        //   }

        //   &:checked ~ .radio-block {
        //     color: red;
        //   }
        // }
      }
    }

    .result {
      grid-area: result;

      display: grid;
      grid-template-columns: 0.75rem 1.25rem;
      grid-template-rows: auto;
      grid-template-areas: "resultlabel resultval";

      .resultlabel {
        grid-area: resultlabel;
        display: inline-block;
        text-align: center;
      }
      .resultval {
        grid-area: resultval;
        display: inline-block;
        text-align: right;
      }
    }

    .cost {
      grid-area: cost;
      border-left: 1px solid #aaa;
      padding-left: 0.25rem;

      display: grid;
      grid-template-columns: 0.75rem auto;
      grid-template-rows: auto;
      grid-template-areas: "costmod costval";

      .costmod {
        grid-area: costmod;
        display: inline-block;
        text-align: center;
      }
      .costval {
        grid-area: costval;
        display: inline-block;
        text-align: right;
      }
    }
  }
}
</style>
