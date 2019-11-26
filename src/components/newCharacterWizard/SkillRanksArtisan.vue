<template>
  <div class="skill-ranks">
    <label>
      <span class="label">Artisan Skill:</span>
      <input type="text" v-model="skillName" />
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
    const skill = Object.keys(char.skills)
      .map(name => ({ name, ...char.skills[name] }))
      .filter(s => s.type === "artisan")[0];
    const oldSkillName = (skill || {}).name;
    const skillName = oldSkillName;

    return { char, oldSkillName, skillName };
  },
  methods: {
    saveSkill() {
      return Promise.resolve()
        .then(() => {
          if (this.oldSkillName != null) {
            return this.$store.dispatch("ccRemoveSkill", {
              name: this.oldSkillName,
            });
          }
        })
        .then(() => {
          this.$store.dispatch("ccAddSkill", {
            name: this.skillName,
            rank: 1,
            type: "artisan",
          });
        });
    },
  },
  computed: {
    dChar() {
      return decorate(this.char);
    },
    valid() {
      // If no name was entered, it's obviously not valid
      if (!this.skillName) return false;

      // If some input was entered and it's the same as the starting value then
      // it's definitely not going to conflict.
      if (this.skillName === this.oldSkillName) return true;

      // If the name has been entered and changed, make sure that the new name
      // does not conflict with any other skills.
      // This is to prevent the situation where, for example, someone enters
      // "Speak Language" as their artisan skill and it overwrites the default
      // "Speak Language" skill.
      return !(this.skillName in this.char.skills);
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

<style scoped lang="scss">
.skill-ranks {
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
