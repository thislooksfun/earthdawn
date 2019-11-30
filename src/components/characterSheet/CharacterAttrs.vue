<template>
  <div class="character-attrs">
    <center><h2>Attributes</h2></center>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
          <th>Step</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(vals, attr) in attrs" :key="attr">
          <td>{{ attr }}</td>
          <td>{{ vals.val }}</td>
          <td>{{ vals.step }}</td>
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
    attrs() {
      return this.dChar.attrs;
    },
  },
};
</script>
