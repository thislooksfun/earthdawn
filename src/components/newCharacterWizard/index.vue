<template>
  <div class="character-wizard">
    <div class="solid lightly padded centered block">
      <h1>Character Creation Wizard</h1>
      (Stage: {{ stage }})
    </div>

    <div v-if="stage == 'invalid'" class="solid padded block">
      <span
        >Something went wrong! If you see this message, please let me
        know.</span
      >
    </div>

    <div v-if="stage == 'basic-info'" class="solid padded block">
      <basic-info :uuid="uuid" @completed="onStageCompletion" />
    </div>

    <div v-if="stage == 'attribute-points'" class="solid padded block">
      <attribute-points :uuid="uuid" @completed="onStageCompletion" />
    </div>

    <div v-if="stage == 'talent-ranks'" class="solid padded block">
      <talent-ranks :uuid="uuid" @completed="onStageCompletion" />
    </div>

    <!-- This only applies to spellcasters -->
    <div v-if="stage == 'spell-ranks'" class="solid padded block">
      <!-- <spell-ranks :uuid="uuid" @completed="onStageCompletion" /> -->
    </div>

    <div v-if="stage == 'skill-ranks::knowledge'" class="solid padded block">
      <skill-ranks-knowledge :uuid="uuid" @completed="onStageCompletion" />
    </div>
    <div v-if="stage == 'skill-ranks::artisan'" class="solid padded block">
      <skill-ranks-artisan :uuid="uuid" @completed="onStageCompletion" />
    </div>
    <div v-if="stage == 'skill-ranks'" class="solid padded block">
      <skill-ranks :uuid="uuid" @completed="onStageCompletion" />
    </div>

    <div v-if="stage == 'flesh-out'" class="solid padded block">
      <!-- <flesh-out-character :uuid="uuid" @completed="onStageCompletion" /> -->
    </div>

    <div class="solid padded block navigation">
      <base-button
        class="wizard-nav nav-back"
        block
        type="secondary"
        :disabled="stage == 'basic-info'"
        @click="goToPrevStage"
        >Back</base-button
      >

      <base-button
        class="wizard-nav nav-next"
        block
        :type="isLastStage ? 'success' : 'primary'"
        :disabled="!stageComplete"
        @click="goToNextStage"
        >{{ isLastStage ? "Finish" : "Next" }}</base-button
      >
    </div>
  </div>
</template>

<script>
import decorate from "@/charDecorator";
import EventBus from "@/helper/eventBus";

import BasicInfo from "./BasicInfo";
import AttributePoints from "./AttributePoints";
import TalentRanks from "./TalentRanks";
// import SpellRanks from "./SpellRanks";
import SkillRanksKnowledge from "./SkillRanksKnowledge";
import SkillRanksArtisan from "./SkillRanksArtisan";
import SkillRanks from "./SkillRanks";
// import FleshOutCharacter from "./FleshOutCharacter";

export default {
  components: {
    BasicInfo,
    AttributePoints,
    TalentRanks,
    // SpellRanks,
    SkillRanksKnowledge,
    SkillRanksArtisan,
    SkillRanks,
    // FleshOutCharacter,
  },
  data() {
    const uuid = this.$route.params.uuid;
    const char = this.$store.state.Characters.characters[uuid];
    return {
      uuid,
      char,
      stageComplete: false,
    };
  },
  methods: {
    goToFirstStage() {
      this.$store.dispatch("ccCreationWizardFirstStage");
    },
    goToPrevStage() {
      EventBus.$emit("wizard-prev-stage");
      this.$store.dispatch("ccCreationWizardPrevStage");
    },
    goToNextStage() {
      EventBus.$emit("wizard-next-stage");
      if (this.isLastStage) {
        this.$store.dispatch("ccCreationWizardClose");
      } else {
        this.$store.dispatch("ccCreationWizardNextStage");
      }
    },
    onStageCompletion(completed) {
      this.stageComplete = completed;
    },
  },
  computed: {
    isLastStage() {
      return this.stage == "flesh-out";
    },
    stage() {
      const s = this.char.creationWizardStage;

      if (s == 0) return "basic-info";
      if (s == 1) return "attribute-points";
      if (s == 2) return "talent-ranks";

      // Only calculate this after stage 0 as the decorating process requires
      // both race and discipline to be set.
      const spellcaster = decorate(this.char).discipline.isSpellcaster;

      if (spellcaster && s == 3) return "spell-ranks";

      const ss = spellcaster ? s : s + 1;
      if (ss == 4) return "skill-ranks::knowledge";
      if (ss == 5) return "skill-ranks::artisan";
      if (ss == 6) return "skill-ranks";
      if (ss == 7) return "flesh-out";

      // Something went wrong! This line of code should never be reached.
      // If it was, reset the stage to a known state (the beginning).

      // TODO: Log with Sentry as well.

      // Use setTimeout() so the function call fully triggers Vue to update.
      // Calling mutating methods within computed properties does weird things
      // to the UI state.
      // eslint-disable-next-line vue/no-async-in-computed-properties
      setTimeout(() => this.goToFirstStage(), 0);

      // Default return so linters stop complaining
      return "";
    },
  },
};
</script>

<style scoped lang="scss">
.character-wizard {
  top: 0;
  padding: 1rem;
  background-color: #ddd;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
}

.block {
  margin-bottom: 1rem;

  &.solid {
    background-color: #fff;
  }
  &.padded {
    padding: 1rem;
    &.lightly {
      padding: 0.5rem;
    }
  }
  &.centered {
    text-align: center;
  }
}

.navigation {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  grid-template-areas: "prev next";
  column-gap: 1rem;

  .wizard-nav {
    margin: 0;

    .nav-back {
      grid-area: prev;
    }
    .nav-next {
      grid-area: next;
    }
  }
}
</style>
