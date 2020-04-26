<template>
  <div class="skill-ranks">
    <label>
      <span class="label">Knowledge Skill 1:</span>
      <input type="text" v-model="skillName1" />
    </label>
    <label>
      <span class="label">Knowledge Skill 2 (optional):</span>
      <input type="text" v-model="skillName2" />
    </label>
  </div>
</template>

<script>
import decorate from "@/charDecorator";
import EventBus from "@/helper/eventBus";

export default {
  props: {
    uuid: {
      type: String,
      default: null,
    },
  },
  data() {
    const char = this.$store.state.Characters.characters[this.uuid];
    const skills = Object.keys(char.skills)
      .map(name => ({ name, ...char.skills[name] }))
      .filter(s => s.type === "knowledge");

    const skill1 = skills[0];
    const oldSkillName1 = (skill1 || {}).name;
    const skillName1 = oldSkillName1;

    const skill2 = skills[1];
    const oldSkillName2 = (skill2 || {}).name;
    const skillName2 = oldSkillName2;

    return { char, oldSkillName1, skillName1, oldSkillName2, skillName2 };
  },
  methods: {
    saveSkill1() {
      return Promise.resolve()
        .then(() => {
          if (this.oldSkillName1 != null) {
            return this.$store.dispatch("ccRemoveSkill", {
              name: this.oldSkillName1,
            });
          }
        })
        .then(() => {
          const rank = this.skillName2 == null ? 2 : 1;
          this.$store.dispatch("ccAddSkill", {
            name: this.skillName1,
            rank,
            type: "knowledge",
          });
        });
    },
    saveSkill2() {
      return Promise.resolve()
        .then(() => {
          if (this.oldSkillName2 != null) {
            return this.$store.dispatch("ccRemoveSkill", {
              name: this.oldSkillName2,
            });
          }
        })
        .then(() => {
          if (this.skillName2) {
            this.$store.dispatch("ccAddSkill", {
              name: this.skillName2,
              rank: 1,
              type: "knowledge",
            });
          }
        });
    },
    saveSkill() {
      return this.saveSkill1().then(() => this.saveSkill2());
    },
  },
  computed: {
    dChar() {
      return decorate(this.char);
    },
    valid1() {
      // If no name was entered, it's obviously not valid
      if (!this.skillName1) return false;

      // If some input was entered and it's the same as the starting value then
      // it's definitely not going to conflict.
      if (this.skillName1 === this.oldSkillName1) return true;

      // If the name has been entered and changed, make sure that the new name
      // does not conflict with any other skills.
      // This is to prevent the situation where, for example, someone enters
      // "Speak Language" as their artisan skill and it overwrites the default
      // "Speak Language" skill.
      return !(this.skillName1 in this.char.skills);
    },
    valid2() {
      // If no name was entered, it's valid because the second skill is optional
      if (!this.skillName2) return true;

      // If some input was entered and it's the same as the starting value then
      // it's definitely not going to conflict.
      if (this.skillName2 === this.oldSkillName2) return true;

      // If the name has been entered and changed, make sure that the new name
      // does not conflict with any other skills.
      // This is to prevent the situation where, for example, someone enters
      // "Speak Language" as their artisan skill and it overwrites the default
      // "Speak Language" skill.
      return !(this.skillName2 in this.char.skills);
    },
    valid() {
      return this.valid1 && this.valid2 && this.skillName1 != this.skillName2;
    },
  },
  created() {
    EventBus.$on("wizard-next-stage", this.saveSkill);
  },
  mounted() {
    this.$emit("completed", this.valid);
  },
  updated() {
    this.$emit("completed", this.valid);
  },
  destroyed() {
    EventBus.$off("wizard-next-stage", this.saveSkill);
  },
};
</script>
