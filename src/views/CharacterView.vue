<template>
  <div class="character-view">
    <div v-if="char.creationWizardStage != null" class="wizard">
      <new-character-wizard :uuid="uuid" />
    </div>
    
    <div v-if="char.creationWizardStage == null" class="wizard">
      <character-sheet :uuid="uuid" />
    </div>
  </div>
</template>

<script>
import NewCharacterWizard from "@/components/NewCharacterWizard";
import CharacterSheet from "@/components/CharacterSheet";

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