<template>
  <div class="karma-points">
    <value-label-group centered label="Karma"
      ><span class="points"
        >{{ karma.current }} / {{ karma.max }}</span
      ></value-label-group
    >

    <div class="controls">
      <base-button
        class="add-skill-btn"
        type="primary"
        size="sm"
        @click="useKarma()"
        >Use</base-button
      >
      <base-button
        class="add-skill-btn"
        type="primary"
        size="sm"
        @click="resetKarma()"
        >Reset</base-button
      >
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
  methods: {
    useKarma() {
      this.$store.dispatch("ccUseKarma");
    },
    resetKarma() {
      this.$store.dispatch("ccResetKarma");
    },
  },
  computed: {
    dChar() {
      return decorate(this.char);
    },
    karma() {
      return this.dChar.karma;
    },
  },
};
</script>

<style scoped lang="scss">
.karma-points {
  .points {
    font-size: 1.75rem;
  }

  .controls {
    margin-top: 0.5rem;
  }
}
</style>
