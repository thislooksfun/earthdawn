<template>
  <div class="character-talents">
    <center><h2>Talents</h2></center>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Action</th>
          <th>Strain</th>
          <th>Attribute</th>
          <th>Rank</th>
          <th>Step</th>
          <th>Action Dice</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(talent, name) in talents" :key="name">
          <td>{{ name }}</td>
          <td>{{ talent.action }}</td>
          <td>{{ talent.strain }}</td>
          <td>{{ talent.attr }}</td>
          <td>{{ talent.rank }}</td>
          <td>{{ talent.step }}</td>
          <td>{{ talent.actionDice }}</td>
        </tr>

        <tr>
          <td colspan="7">
            <center><b>Talent Options</b></center>
          </td>
        </tr>

        <tr v-for="topt in talentOptions" :key="topt.name">
          <td>{{ topt.name }}</td>
          <td>{{ topt.action }}</td>
          <td>{{ topt.strain }}</td>
          <td>{{ topt.attr }}</td>
          <td>{{ topt.rank }}</td>
          <td>{{ topt.step }}</td>
          <td>{{ topt.actionDice }}</td>
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
    talents() {
      return this.dChar.talents;
    },
    talentOptions() {
      return this.dChar.talentOptions;
    },
  },
};
</script>
