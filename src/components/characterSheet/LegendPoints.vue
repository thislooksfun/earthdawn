<template>
  <div class="legend-points">
    <center><h2>Legend Points</h2></center>

    <table>
      <thead>
        <tr>
          <th>Current</th>
          <th>Total</th>
          <!-- TODO: Implement these: -->
          <!-- <th>Reputation</th> -->
          <!-- <th>Renown</th> -->
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ legendPoints.current }}</td>
          <td>{{ legendPoints.total }}</td>
        </tr>
      </tbody>
    </table>
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
    legendPoints() {
      return this.dChar.legendPoints;
    },
  },
};
</script>
