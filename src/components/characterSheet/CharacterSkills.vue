<template>
  <div class="character-skills">
    <value-label-group outlined label="Knowledge Skills" class="skill-group">
      <skill
        v-for="(skill, name) in skillGroups.knowledge"
        :key="name"
        :skill="skill"
      />
    </value-label-group>

    <value-label-group outlined label="Artisan Skills" class="skill-group">
      <skill
        v-for="(skill, name) in skillGroups.artisan"
        :key="name"
        :skill="skill"
      />
    </value-label-group>

    <value-label-group outlined label="Language Skills" class="skill-group">
      <skill :skill="speakLang" />
      <skill :skill="readWriteLang" />
    </value-label-group>

    <value-label-group
      v-if="skillGroups.other"
      outlined
      label="Other Skills"
      class="skill-group"
    >
      <skill
        v-for="(skill, name) in skillGroups.other"
        :key="name"
        :skill="skill"
      />
    </value-label-group>
  </div>
</template>

<script>
import decorate from "@/charDecorator";
import skills from "Skills";
import talents from "Talents";
import Skill from "./helper/Skill";

const upperFirst = require("lodash/upperFirst");

export default {
  props: {
    uuid: {
      type: String,
      default: null,
    },
  },
  components: {
    Skill,
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

<style scoped lang="scss">
.character-skills {
  .skill-group {
    .skill {
      margin: 0.75rem 0;
      padding: 0 0.5rem;

      &:first-child {
        margin-top: 0.25rem;
      }
    }

    &:not(:first-child) {
      margin-top: 1rem;
    }
  }
}
</style>
