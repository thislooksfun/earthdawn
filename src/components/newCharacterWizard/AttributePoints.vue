<template>
  <div class="attribute-points">
    <div
      v-for="attrName in ['dex', 'str', 'tou', 'per', 'wil', 'cha']"
      :key="attrName"
      class="attribute"
    >
      <span class="attrname">{{attrName.toUpperCase()}}:</span>
      <div class="attrbase">
        <span class="baselabel">Base:</span>
        <span class="baseval">{{baseAttrs[attrName]}}</span>
      </div>

      <div class="radiogroup">
        <label
          v-for="mod in modifiers"
          :key="mod.effect"
          class="inline"
          :class="{toomuch: costs[mod.effect] > (attributePoints + costs[mods[attrName]])}"
          v-b-tooltip.hover.down
          :title="mod.humanCost"
        >
          <input
            type="radio"
            :name="`${attrName}mod`"
            :value="mod.effect"
            :disabled="costs[mod.effect] > (attributePoints + costs[mods[attrName]])"
            :checked="mods[attrName] == mod.effect"
            @change="addEffectAndEmit(attrName, mod.effect)"
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

      <div class="result">
        <span class="resultlabel">=</span>
        <span class="resultval">{{currentAttrs[attrName].val}}</span>
      </div>

      <div class="cost">
        <span class="costmod">{{costs[mods[attrName]] >= 0 ? '-' : '+' }}</span>
        <span class="costval">{{Math.abs(costs[mods[attrName]])}}</span>
      </div>
    </div>

    <div>Attribute Points: {{attributePoints}}</div>
    <!-- <div>dex: {{currentAttrs.dex.val}}</div> -->
    <!-- <div>str: {{currentAttrs.str.val}}</div> -->
    <div>effects: {{char['effects!']}}</div>
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
      const keys = Object.keys(this.mods);
      const mods = keys.map(k => this.mods[k]);
      const costs = keys.map(k => this.costs[this.mods[k]]);
      const cost = costs.reduce((t, v) => t + v);

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
    this.$emit("completed", this.attributePoints >= 0);
  },
};
</script>

<style scoped lang="scss">
.attribute-points {
  .attribute {
    $height: 2.25rem;
    height: $height;
    line-height: $height;

    display: grid;
    grid-template-columns: 3rem 4.15rem auto 2.5rem 2.5rem;
    grid-template-rows: auto;
    grid-template-areas: "attrname attrbase main result cost";

    border-bottom: 1px solid #aaa;

    .attrname {
      grid-area: attrname;
    }

    .attrbase {
      grid-area: attrbase;

      .baselabel {
        display: inline-block;
        width: 2.65rem;
        text-align: left;
      }
      .baseval {
        display: inline-block;
        width: 1.25rem;
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

      .resultlabel {
        display: inline-block;
        width: 0.75rem;
        text-align: center;
      }
      .resultval {
        display: inline-block;
        width: 1.25rem;
        text-align: right;
      }
    }

    .cost {
      grid-area: cost;
      border-left: 1px solid #aaa;
      padding-left: 0.25rem;

      .costmod {
        display: inline-block;
        width: 0.75rem;
        text-align: center;
      }
      .costval {
        display: inline-block;
        width: 1.25rem;
        text-align: right;
      }
    }
  }
}
</style>