<template>
  <div class="character-sheet">
    <div class="block">
      <base-button
        :class="char.editMode ? '' : 'primary-bg'"
        block
        :type="char.editMode ? 'primary' : 'secondary'"
        @click="toggleEditMode"
        >Switch to {{ char.editMode ? "Play" : "Edit" }} Mode</base-button
      >
    </div>

    <div class="solid lightly padded block">
      <character-header :uuid="uuid" />
    </div>

    <div class="solid padded block">
      <health-section :disabled="char.editMode" :uuid="uuid" />
    </div>

    <div class="solid padded block">
      <character-attrs :uuid="uuid" />
    </div>
  </div>
</template>

<script>
import CharacterHeader from "./CharacterHeader";
import HealthSection from "./HealthSection";
import CharacterAttrs from "./CharacterAttrs";

export default {
  components: {
    CharacterHeader,
    HealthSection,
    CharacterAttrs,
  },
  props: {
    uuid: {
      type: String,
      default: null,
    },
  },
  data() {
    const char = this.$store.state.Characters.characters[this.uuid];
    return { char };
  },
  methods: {
    toggleEditMode() {
      this.$store.dispatch("ccToggleEditMode");
    },
  },
};
</script>
