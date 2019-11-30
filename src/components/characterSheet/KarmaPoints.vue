<template>
  <div class="karma-points">
    <center><h2>Karma</h2></center>

    <table>
      <thead>
        <tr>
          <th>Current</th>
          <th>Max</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ karma.current }}</td>
          <td>{{ karma.max }}</td>
        </tr>
      </tbody>
    </table>

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
