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

        <tr>
          <td colspan="7">
            <center><b>Talent Options</b></center>
          </td>
        </tr>

        <tr>
          <td>
            <select v-model="talentOptionName">
              <option disabled value>Please select one</option>
              <option
                v-for="t in availableTalentOptions"
                :key="t.name"
                :value="t.name"
                >{{ t.name }}</option
              >
            </select>
          </td>
          <td>{{ talentOption.action }}</td>
          <td>{{ talentOption.strain }}</td>
          <td>{{ talentOption.attr }}</td>
          <td>
            <base-button
              v-for="r in [0, 1, 2, 3]"
              :key="r"
              size="sm"
              :type="talentOption.rank == r ? 'primary' : 'secondary'"
              :disabled="
                talentOptionName == '' ||
                  r > remainingPoints + talentOption.rank
              "
              @click="setTalentOptionRank(r)"
              >{{ r }}</base-button
            >
          </td>
          <td>{{ talentOption.step }}</td>
          <td>{{ talentOption.actionDice }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import decorate from "@/charDecorator";
import talents from "Talents";

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
    setTalentOptionRank(rank) {
      this.talentOptionRank = rank;
    },
  },
  computed: {
    dChar() {
      return decorate(this.char);
    },
    talents() {
      return this.dChar.talents;
    },
    availableTalentOptions() {
      return this.dChar.discipline.talentOptions.novice
        .map(name => talents[name])
        .reduce((o, t) => ({ ...o, [t.name]: t }), {});
    },
    talentOptionRank: {
      get() {
        return this.talentOption.rank || 0;
      },
      set(rank) {
        this.$store.dispatch("ccSetTalentOption", {
          slot: 0,
          name: this.talentOptionName,
          rank,
        });
      },
    },
    talentOptionName: {
      get() {
        return this.talentOption.name || "";
      },
      set(name) {
        this.$store.dispatch("ccSetTalentOption", { slot: 0, name, rank: 0 });
      },
    },
    talentOption() {
      return this.dChar.talentOptions[0] || {};
    },
    remainingPoints() {
      return (
        8 -
        Object.values(this.dChar.talents)
          .map(t => t.rank)
          .reduce((t, v) => t + v, 0) -
        this.talentOptionRank
      );
    },
  },
  mounted() {
    this.$emit("completed", true);
  },
};
</script>

<style scoped lang="scss">
.talent-ranks {
  table {
    &,
    th,
    td {
      border: 1px solid var(--table-primary);
    }

    th,
    td {
      padding: 0.25rem 0.5rem;
    }
  }
}
</style>
