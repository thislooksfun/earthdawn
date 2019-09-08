<template>
  <div class="character-wizard">
    <div class="solid lightly padded centered block">
      <h1>Character Creation Wizard</h1>
    </div>

    <div v-if="stage == 0" class="solid padded block">
      <basic-info :uuid="uuid" @completed="currentStageOnCompletionChange" />
    </div>

    <div v-if="stage == 1" class="solid padded block">
      <attribute-points :uuid="uuid" @completed="currentStageOnCompletionChange" />
    </div>

    <div v-if="stage == 2" class="solid padded block">
      <!-- <talent-ranks :uuid="uuid" @completed="currentStageOnCompletionChange" /> -->
    </div>

    <!-- This only applies to spellcasters -->
    <div v-if="stage == 3" class="solid padded block">
      <!-- <spell-ranks :uuid="uuid" @completed="currentStageOnCompletionChange" /> -->
    </div>

    <div v-if="stage == 4" class="solid padded block">
      <!-- <skill-ranks :uuid="uuid" @completed="currentStageOnCompletionChange" /> -->
    </div>

    <div v-if="stage == 5" class="solid padded block">
      <!-- <flesh-out-character :uuid="uuid" @completed="currentStageOnCompletionChange" /> -->
    </div>

    <div class="solid padded block navigation">
      <base-button
        class="wizard-nav nav-back"
        block
        type="secondary"
        :disabled="stage == 0"
        @click="goToPrevStage"
      >Back</base-button>

      <base-button
        class="wizard-nav nav-next"
        block
        :type="isLastStage ? 'success' : 'primary'"
        :disabled="!stageComplete"
        @click="goToNextStage"
      >{{isLastStage ? 'Finish' : 'Next'}}</base-button>
    </div>
  </div>
</template>

<script>
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
    goToPrevStage() {
      this.$store.dispatch("ccCreationWizardPrevStage");
    },
    goToNextStage() {
      this.$store.dispatch("ccCreationWizardNextStage");
    },
    currentStageOnCompletionChange(completed) {
      this.stageComplete = completed;
    },
  },
  computed: {
    isLastStage() {
      return this.stage == 5;
    },
    stage() {
      return this.char.creationWizardStage;
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