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
    return {
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
    addEffectAndEmit(attrName, value) {
      this.$store.dispatch("ccAddEffect", { name: `${attrName}Val`, value });
      this.$emit("completed", this.attributePoints >= 0);
    },
  },
  computed: {
    mods() {
      return {
        dex: this.currentAttrs.dex.val - this.baseAttrs.dex,
        str: this.currentAttrs.str.val - this.baseAttrs.str,
        tou: this.currentAttrs.tou.val - this.baseAttrs.tou,
        per: this.currentAttrs.per.val - this.baseAttrs.per,
        wil: this.currentAttrs.wil.val - this.baseAttrs.wil,
        cha: this.currentAttrs.cha.val - this.baseAttrs.cha,
      };
    },

    attributePoints() {
      const keys = Object.keys(this.mods);
      const mods = keys.map(k => this.mods[k]);
      const costs = keys.map(k => this.costs[this.mods[k]]);
      const cost = costs.reduce((t, v) => t + v)
      
      console.log('keys', keys);
      console.log('mods', mods);
      console.log('costs', costs);
      console.log('cost', cost);
      
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