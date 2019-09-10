<template>
  <div class="talent-ranks">
    <div class="remaining-points">Remaining points: {{ remainingPoints }}</div>

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
          <td>
            <base-button
              v-for="r in [0, 1, 2, 3]"
              :key="r"
              size="sm"
              :type="talent.rank == r ? 'primary' : 'secondary'"
              :disabled="r > remainingPoints + talent.rank"
              @click="setTalentRank(name, r)"
              >{{ r }}</base-button
            >
          </td>
          <td>{{ talent.step }}</td>
          <td>{{ talent.actionDice }}</td>
        </tr>
      </tbody>
    </table>

    <!-- TODO: Implement talent options -->
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
    setTalentRank(talent, rank) {
      this.$store.dispatch("ccSetTalentRank", { talent, rank });
    },
  },
  computed: {
    dChar() {
      return decorate(this.char);
    },
    talents() {
      return this.dChar.talents;
    },
    remainingPoints() {
      return (
        8 -
        // TODO: Factor in talent options... somehow
        Object.values(this.dChar.talents)
          .map(t => t.rank)
          .reduce((t, v) => t + v, 0)
      );
    },
  },
};
</script>

<style scoped lang="scss">
.talent-ranks {
  table {
    &,
    th,
    td {
      border: 1px solid #aaa;
    }

    th,
    td {
      padding: 0.25rem 0.5rem;
    }
  }
}
</style>
