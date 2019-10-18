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
              v-for="r in [2, 3]"
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
              v-for="r in [1, 2, 3]"
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
              v-for="r in [2, 3]"
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
              v-for="r in [1, 2, 3]"
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
          <td>
            <div class="other-skill">
              <span class="name">{{ name }}</span>
              <base-button
                type="danger"
                size="sm"
                icon="fa fa-trash-o"
                @click="removeSkill(name)"
                style="font-size: 0.9rem"
                class="remove-btn"
              ></base-button>
            </div>
          </td>
          <td>{{ skill.action }}</td>
          <td>{{ skill.strain }}</td>
          <td>{{ skill.attr }}</td>
          <td>
            <base-button
              v-for="r in [1, 2, 3]"
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
      <select v-model="selectedSkill">
        <option disabled value>Please select one</option>
        <option v-for="name in availableSkillNames" :key="name" :value="name">{{
          name
        }}</option>
      </select>

      <base-button
        class="add-skill-btn"
        type="primary"
        size="sm"
        :disabled="remainingPoints == 0 || !selectedSkill"
        @click="addSelectedSkill()"
        >Add Skill</base-button
      >
    </div>
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
      // Nothing selected
      if (!this.selectedSkill) return;
      this.$store.dispatch("ccAddSkill", { name: this.selectedSkill, rank: 1 });
    },
    removeSkill(name) {
      this.$store.dispatch("ccRemoveSkill", { name });
    },
  },
  computed: {
    dChar() {
      return decorate(this.char);
    },
    availableSkillNames() {
      return Object.keys(this.learnableSkills).filter(
        s => !(s in this.char.skills)
      );
    },
    learnableSkills() {
      const noviceTalents = Object.keys(talents)
        .filter(t => talents[t].skill_use === "novice")
        .reduce((o, t) => ({ ...o, [t]: talents[t] }), {});
      // Add the talents first so that skills can override the talents if a
      // specific skill version exists
      return {
        ...noviceTalents,
        ...skills,
      };
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

.new-skill {
  margin-top: 0.25rem;

  select {
    margin-right: 1rem;
  }
}

.other-skill {
  display: grid;
  grid-template-columns: auto 2rem;
  grid-template-rows: auto;
  grid-template-areas: "name remove-btn";

  .name {
    grid-area: name;
  }
  .remove-btn {
    grid-area: remove-btn;
  }
}
</style>
