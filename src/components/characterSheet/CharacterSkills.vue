<template>
  <div class="character-skills">
    <center><h2>Skills</h2></center>

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
          <td>{{ skill.rank }}</td>
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
          <td>{{ skill.rank }}</td>
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
          <td>{{ speakLang.rank }}</td>
          <td>{{ speakLang.step }}</td>
          <td>{{ speakLang.actionDice }}</td>
        </tr>
        <tr>
          <td>{{ readWriteLang.name }}</td>
          <td>{{ readWriteLang.action }}</td>
          <td>{{ readWriteLang.strain }}</td>
          <td>{{ readWriteLang.attr }}</td>
          <td>{{ readWriteLang.rank }}</td>
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
          <td>{{ skill.rank }}</td>
          <td>{{ skill.step }}</td>
          <td>{{ skill.actionDice }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import decorate from "@/charDecorator";
import skills from "Skills";
import talents from "Talents";

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
    return { char, selectedSkill: "" };
  },
  methods: {
    setSkillRank(name, rank) {
      this.$store.dispatch("ccSetSkillRank", { name, rank });
    },
    prettyGroupName(group) {
      return upperFirst(group.slice(1)) + " Skills";
    },
    addSelectedSkill() {
      if (this.selectedSkill) {
        // Ensure something else selected
        this.$store.dispatch("ccAddSkill", {
          name: this.selectedSkill,
          rank: 1,
        });
      }
      this.selectedSkill = "";
    },
    removeSkill(name) {
      this.$store.dispatch("ccRemoveSkill", { name });
    },
    isRedundant(name) {
      // The character already has this skill as a talent.
      if (name in this.dChar.talents) return true;
      // The character chose this skill as one of their talent options.
      console.log(this.dChar.talentOptions);
      if (this.dChar.talentOptions.filter(o => o.name == name).length > 0)
        return true;
      // The character does not already have this skill as a talent.
      return false;
    },
  },
  computed: {
    dChar() {
      return decorate(this.char);
    },
    availableTalentNames() {
      const noviceTalents = Object.keys(talents)
        .filter(t => talents[t].skill_use === "novice")
        .reduce((o, t) => ({ ...o, [t]: talents[t] }), {});
      return Object.keys(noviceTalents).filter(s => !(s in this.char.skills));
    },
    availableSkillNames() {
      return Object.keys(skills).filter(s => !(s in this.char.skills));
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
  },
  mounted() {
    this.$emit("completed", true);
  },
};
</script>
