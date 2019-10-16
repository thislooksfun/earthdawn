<template>
  <div class="skill-ranks">
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
        <!-- Knowledge Skills -->
        <tr align="center">
          <td colspan="7">Knowledge Skills</td>
        </tr>
        <tr v-for="(skill, name) in skillGroups.knowledge" :key="name">
          <td>{{ name }}</td>
          <td>{{ skill.action }}</td>
          <td>{{ skill.strain }}</td>
          <td>{{ skill.attr }}</td>
          <td>
            <base-button
              size="sm"
              :type="skill.rank == 1 ? 'primary' : 'secondary'"
              :disabled="
                Object.keys(skillGroups.knowledge).length == 1 ||
                  1 > remainingPoints + skill.rank
              "
              @click="setSkillRank(name, 1)"
              >1</base-button
            >
            <base-button
              v-for="r in [2, 3, 4, 5, 6, 7, 8, 9, 10]"
              :key="r"
              size="sm"
              :type="skill.rank == r ? 'primary' : 'secondary'"
              :disabled="r > remainingPoints + skill.rank"
              @click="setSkillRank(name, r)"
              >{{ r }}</base-button
            >
          </td>
          <td>{{ skill.step }}</td>
          <td>{{ skill.actionDice }}</td>
        </tr>

        <!-- Artisan Skills -->
        <tr align="center">
          <td colspan="7">Artisan Skills</td>
        </tr>
        <tr v-for="(skill, name) in skillGroups.artisan" :key="name">
          <td>{{ name }}</td>
          <td>{{ skill.action }}</td>
          <td>{{ skill.strain }}</td>
          <td>{{ skill.attr }}</td>
          <td>
            <base-button
              v-for="r in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
              :key="r"
              size="sm"
              :type="skill.rank == r ? 'primary' : 'secondary'"
              :disabled="r > remainingPoints + skill.rank"
              @click="setSkillRank(name, r)"
              >{{ r }}</base-button
            >
          </td>
          <td>{{ skill.step }}</td>
          <td>{{ skill.actionDice }}</td>
        </tr>

        <!-- Language Skills -->
        <tr align="center">
          <td colspan="7">Language Skills</td>
        </tr>
        <tr>
          <td>{{ speakLang.name }}</td>
          <td>{{ speakLang.action }}</td>
          <td>{{ speakLang.strain }}</td>
          <td>{{ speakLang.attr }}</td>
          <td>
            <base-button size="sm" type="secondary" disabled>1</base-button>
            <base-button
              v-for="r in [2, 3, 4, 5, 6, 7, 8, 9, 10]"
              :key="r"
              size="sm"
              :type="speakLang.rank == r ? 'primary' : 'secondary'"
              :disabled="r > remainingPoints + speakLang.rank"
              @click="setSkillRank(speakLang.name, r)"
              >{{ r }}</base-button
            >
          </td>
          <td>{{ speakLang.step }}</td>
          <td>{{ speakLang.actionDice }}</td>
        </tr>
        <tr>
          <td>{{ readWriteLang.name }}</td>
          <td>{{ readWriteLang.action }}</td>
          <td>{{ readWriteLang.strain }}</td>
          <td>{{ readWriteLang.attr }}</td>
          <td>
            <base-button
              v-for="r in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
              :key="r"
              size="sm"
              :type="readWriteLang.rank == r ? 'primary' : 'secondary'"
              :disabled="r > remainingPoints + readWriteLang.rank"
              @click="setSkillRank(readWriteLang.name, r)"
              >{{ r }}</base-button
            >
          </td>
          <td>{{ readWriteLang.step }}</td>
          <td>{{ readWriteLang.actionDice }}</td>
        </tr>

        <!-- Other Skills -->
        <tr align="center">
          <td colspan="7">Other Skills</td>
        </tr>
        <tr v-for="(skill, name) in skillGroups.other" :key="name">
          <td>{{ name }}</td>
          <td>{{ skill.action }}</td>
          <td>{{ skill.strain }}</td>
          <td>{{ skill.attr }}</td>
          <td>
            <base-button
              v-for="r in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
              :key="r"
              size="sm"
              :type="skill.rank == r ? 'primary' : 'secondary'"
              :disabled="r > remainingPoints + skill.rank"
              @click="setSkillRank(name, r)"
              >{{ r }}</base-button
            >
          </td>
          <td>{{ skill.step }}</td>
          <td>{{ skill.actionDice }}</td>
        </tr>
      </tbody>
    </table>

    <div class="new-skill">
      <select>
        <option disabled value>Please select one</option>
        <option v-for="(s, name) in skills" :key="name" :value="name">{{
          name
        }}</option>
      </select>

      <base-button
        type="primary"
        :disabled="remainingPoints == 0"
        @click="addSkill()"
        >Add Skill</base-button
      >
    </div>

    <br />
    <pre>{{ JSON.stringify(char.skills, null, 2) }}</pre>
    <div>{{ skills }}</div>
  </div>
</template>

<script>
import decorate from "@/charDecorator";
import skills from "Skills";

console.log(skills);

const upperFirst = require("lodash/upperFirst");

export default {
  props: {
    uuid: {
      type: String,
      default: null,
    },
  },
  data() {
    const char = this.$store.state.Characters.characters[this.uuid];
    return { char, skills };
  },
  methods: {
    setSkillRank(name, rank) {
      this.$store.dispatch("ccSetSkillRank", { name, rank });
    },
    // setSkillOptionRank(rank) {
    //   this.skillOptionRank = rank;
    // },
    prettyGroupName(group) {
      return upperFirst(group.slice(1)) + " Skills";
    },
    addSkill() {},
  },
  computed: {
    dChar() {
      return decorate(this.char);
    },
    skillGroups() {
      return this.dChar.skills;
    },
    speakLang() {
      return this.skillGroups.language["Speak Language"];
    },
    readWriteLang() {
      return this.skillGroups.language["Read and Write Language"];
    },
    // availableSkillOptions() {
    //   return this.dChar.discipline.skillOptions.novice
    //     .map(name => skills[name])
    //     .reduce((o, t) => ({ ...o, [t.name]: t }), {});
    // },
    // skillOptionRank: {
    //   get() {
    //     return this.skillOption.rank || 0;
    //   },
    //   set(rank) {
    //     this.$store.dispatch("ccSetSkillOption", {
    //       slot: 0,
    //       name: this.skillOptionName,
    //       rank,
    //     });
    //   },
    // },
    // skillOptionName: {
    //   get() {
    //     return this.skillOption.name || "";
    //   },
    //   set(name) {
    //     this.$store.dispatch("ccSetSkillOption", { slot: 0, name, rank: 0 });
    //   },
    // },
    // skillOption() {
    //   return this.dChar.skillOptions[0] || {};
    // },
    remainingPoints() {
      const skillz = this.dChar.skills;

      const getPoints = (type, dflt) =>
        Object.values(skillz[type] || {})
          .map(t => t.rank)
          .reduce((t, p) => t + p, 0) - dflt;

      const knowledgePoints = getPoints("knowledge", 2);
      const artisanPoints = getPoints("artisan", 1);
      const languagePoints = getPoints("language", 3);
      const otherPoints = getPoints("other", 0);

      return 8 - knowledgePoints - artisanPoints - languagePoints - otherPoints;
    },
  },
  mounted() {
    this.$emit("completed", true);
  },
};
</script>

<style scoped lang="scss">
.skill-ranks {
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
