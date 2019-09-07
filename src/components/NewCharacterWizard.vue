<template>
  <div class="character-wizard">
    <h1>Character Creation Wizard</h1>
    
    <div class="solid padded block">
      <basic-info :uuid="uuid" />
    </div>
  </div>
</template>

<script>
import BasicInfo from "./newCharacterWizard/BasicInfo";

export default {
  components: {
    BasicInfo,
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
}
</style>