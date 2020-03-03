<template>
  <div class="health-section">
    <base-button
      class="damage"
      type="danger"
      style="font-size: 1rem"
      :icon="['fas', 'minus']"
      v-b-tooltip.hover.down
      title="Deal Damage"
      :disabled="disabled || invalid"
      @click="deal1Damage"
    ></base-button>
    <div class="health-bar">
      <health-bar
        :damage="health.currentDamage"
        :unconsciousness="health.unconsciousnessThreshold"
        :death="health.deathThreshold"
        :disabled="disabled"
      />
    </div>
    <base-button
      class="recover"
      type="success"
      style="font-size: 1rem"
      :icon="['fas', 'plus']"
      v-b-tooltip.hover.down
      :title="
        `Recover Health (${health.recoveryTests.remaining} recovery tests remaining)`
      "
      :disabled="disabled || invalid"
      @click="recover1Health"
    ></base-button>

    <value-label-group class="wounds" label="Wounds" :value="health.wounds" />
  </div>
</template>

<script>
import decorate from "@/charDecorator";
import HealthBar from "./HealthBar";

export default {
  props: {
    uuid: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    HealthBar,
  },
  data() {
    const char = this.$store.state.Characters.characters[this.uuid];
    return {
      char,
    };
  },
  methods: {
    deal1Damage() {
      this.$store.dispatch("ccDealDamage", { type: "physical", dmg: 1 });
    },
    recover1Health() {
      this.$store.dispatch("ccRecoverHealth", 1);
    },
  },
  computed: {
    dChar() {
      return decorate(this.char);
    },
    valid() {
      const dt = this.health.deathThreshold;
      const ut = this.health.unconsciousnessThreshold;
      const cd = this.health.currentDamage;
      return dt > 0 && ut > 0 && dt > ut && cd >= 0;
    },
    invalid() {
      return !this.valid;
    },
    health() {
      return this.dChar.health;
    },
  },
};
</script>

<style scoped lang="scss">
.health-section {
  display: grid;
  grid-template-columns: 5rem auto 5rem 5rem;
  grid-template-rows: auto;
  grid-template-areas: "damage bar recover wounds";

  .damage {
    margin-right: 0.5rem;
    grid-area: damage;
  }
  .health-bar {
    grid-area: bar;
  }
  .recover {
    margin-left: 0.5rem;
    grid-area: recover;
  }
  .wounds {
    position: relative;
    grid-area: wounds;
  }
}
</style>
