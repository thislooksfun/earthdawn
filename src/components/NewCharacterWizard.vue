<template>
  <div class="character-wizard">
    <div class="solid lightly padded centered block">
      <h1>Character Creation Wizard</h1>
    </div>

    <div v-if="stage == 0" class="solid padded block">
      <basic-info :uuid="uuid" @completed="currentStageOnCompletionChange" />
    </div>

    <div class="solid padded block navigation">
      <base-button
        class="wizard-nav nav-back"
        block
        type="secondary"
        :disabled="char.creationWizardStage == 0"
        @click="prevStage"
      >Back</base-button>

      <base-button
        class="wizard-nav nav-next"
        block
        type="primary"
        :disabled="!stageComplete"
        @click="nextStage"
      >{{char.creationWizardStage == 0 ? 'Finish' : 'Next'}}</base-button>
    </div>
  </div>
</template>

<script>
import BasicInfo from "./newCharacterWizard/BasicInfo";

export default {
  components: {
    BasicInfo
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
    prevStage() {
      this.$store.dispatch("ccCreationWizardPrevStage");
    },
    nextStage() {
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