<template>
  <div class="character-wizard">
    <div class="solid lightly padded centered block">
      <h1>Character Creation Wizard</h1>
    </div>

    <div v-if="stage == 'invalid'" class="solid padded block">
      <span
        >Something went wrong! If you see this message, please let me
        know.</span
      >
    </div>

    <div v-if="stage == 'basic-info'" class="solid padded block">
      <basic-info :uuid="uuid" @completed="currentStageOnCompletionChange" />
    </div>

    <div v-if="stage == 'attribute-points'" class="solid padded block">
      <attribute-points
        :uuid="uuid"
        @completed="currentStageOnCompletionChange"
      />
    </div>

    <div v-if="stage == 'talent-ranks'" class="solid padded block">
      <!-- <talent-ranks :uuid="uuid" @completed="currentStageOnCompletionChange" /> -->
    </div>

    <!-- This only applies to spellcasters -->
    <div v-if="stage == 'spell-ranks'" class="solid padded block">
      <!-- <spell-ranks :uuid="uuid" @completed="currentStageOnCompletionChange" /> -->
    </div>

    <div v-if="stage == 'skill-ranks'" class="solid padded block">
      <!-- <skill-ranks :uuid="uuid" @completed="currentStageOnCompletionChange" /> -->
    </div>

    <div v-if="stage == 'flesh-out'" class="solid padded block">
      <!-- <flesh-out-character :uuid="uuid" @completed="currentStageOnCompletionChange" /> -->
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

import BasicInfo from "./newCharacterWizard/BasicInfo";
import AttributePoints from "./newCharacterWizard/AttributePoints";

export default {
  components: {
    BasicInfo,
    AttributePoints,
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
      this.$store.dispatch("ccCreationWizardPrevStage");
    },
    goToNextStage() {
      if (this.isLastStage) {
        this.$store.dispatch("ccCreationWizardClose");
      } else {
        this.$store.dispatch("ccCreationWizardNextStage");
      }
    },
    currentStageOnCompletionChange(completed) {
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
      if (s == (spellcaster ? 4 : 3)) return "skill-ranks";
      if (s == (spellcaster ? 5 : 4)) return "flesh-out";

      // Something went wrong! This line of code should never be reached.
      // If it was, reset the stage to a known state (the beginning).

      // TODO: Log with Sentry as well.

      // Use setTimeout() so the function call fully triggers Vue to update.
      // Calling mutating methods within computed properties does weird things
      // to the UI state.
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
