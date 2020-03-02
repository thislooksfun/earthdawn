<template>
  <div class="karma-points">
    <div class="centered val-label-group">
      <span class="label">Karma</span>
      <span class="value">{{ karma.current }} / {{ karma.max }}</span>
    </div>

    <div class="ctrls">
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
