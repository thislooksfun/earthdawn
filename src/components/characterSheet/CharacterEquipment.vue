<template>
  <div class="character-equipment">
    <center><h2>Equipment</h2></center>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(count, name) in equipment" :key="name">
          <td>{{ name }}</td>
          <td>{{ count }}</td>
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
    equipment() {
      return this.dChar.equipment;
    },
  },
};
</script>
