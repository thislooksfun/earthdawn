<template>
  <div class="character-view">
    <div v-if="char.creationWizardStage != null" class="wizard">
      <new-character-wizard :uuid="uuid" />
    </div>

    <div v-if="char.creationWizardStage == null" class="play">
      <character-sheet :uuid="uuid" />
    </div>
  </div>
</template>

<script>
import NewCharacterWizard from "@/components/newCharacterWizard";
import CharacterSheet from "@/components/characterSheet";

export default {
  components: {
    NewCharacterWizard,
    CharacterSheet,
  },
  data() {
    const uuid = this.$route.params.uuid;
    const char = this.$store.state.Characters.characters[uuid];
    return {
      uuid,
      char,
    };
  },
};
</script>

<style lang="scss">
.character-view {
  top: 0;
  padding: 1rem;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;

  .block {
    margin-bottom: 1rem;

    &.solid {
      background-color: var(--background-primary);
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
}
</style>
