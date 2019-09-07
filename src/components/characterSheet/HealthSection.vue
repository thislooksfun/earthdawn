<template>
  <div class="health-section">
    <base-button
      class="damage"
      type="danger"
      style="font-size: 1rem"
      icon="fa fa-minus"
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
      icon="fa fa-plus"
      v-b-tooltip.hover.down
      title="Recover Health"
      :disabled="disabled || invalid"
      @click="recover1Health"
    ></base-button>
  </div>
</template>

<script>
import decorate from '@/charDecorator'
import HealthBar from "./HealthBar";
export default {
  props: {
    uuid: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    HealthBar
  },
  data() {
    const char = this.$store.state.Characters.characters[this.uuid];
    return {
      char,
    };
  },
  methods: {
    deal1Damage() {
      this.$store.dispatch("ccDealDamage", {type: "physical", dmg: 1})
    },
    recover1Health() {
      this.$store.dispatch("ccRecoverHealth", 1)
    },
  },
  computed: {
    // State helpers
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
      return decorate(this.char).health
    }
  }
};
</script>

<style scoped lang="scss">
.health-section {
  display: grid;
  grid-template-columns: 5rem auto 5rem;
  grid-template-rows: auto;
  grid-template-areas: "damage bar recover";

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
}
</style>