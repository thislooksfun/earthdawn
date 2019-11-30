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

    <div class="solid padded block">
      <character-talents :uuid="uuid" />
    </div>

    <div class="solid padded block">
      <character-skills :uuid="uuid" />
    </div>

    <div v-if="dChar.discipline.isSpellcaster" class="solid padded block">
      <character-spells :uuid="uuid" />
    </div>

    <div class="solid padded block">
      <character-equipment :uuid="uuid" />
    </div>

    <div class="solid padded block">
      <legend-points :uuid="uuid" />
    </div>

    <div class="solid padded block">
      <karma-points :uuid="uuid" />
    </div>
  </div>
</template>

<script>
import decorate from "@/charDecorator";

import KarmaPoints from "./KarmaPoints";
import LegendPoints from "./LegendPoints";
import HealthSection from "./HealthSection";
import CharacterAttrs from "./CharacterAttrs";
import CharacterHeader from "./CharacterHeader";
import CharacterSpells from "./CharacterSpells";
import CharacterSkills from "./CharacterSkills";
import CharacterTalents from "./CharacterTalents";
import CharacterEquipment from "./CharacterEquipment";

export default {
  components: {
    KarmaPoints,
    LegendPoints,
    HealthSection,
    CharacterAttrs,
    CharacterHeader,
    CharacterSpells,
    CharacterSkills,
    CharacterTalents,
    CharacterEquipment,
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
  computed: {
    dChar() {
      return decorate(this.char);
    },
  },
};
</script>
