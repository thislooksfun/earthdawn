<template>
  <div class="character-talents">
    <value-label-group outlined label="Talents" class="talents">
      <talent v-for="(talent, name) in talents" :key="name" :talent="talent" />
    </value-label-group>

    <value-label-group
      v-if="talentOptions.length > 0"
      outlined
      label="Talent Options"
      class="talent-options"
    >
      <talent v-for="topt in talentOptions" :key="topt.name" :talent="topt" />
    </value-label-group>
  </div>
</template>

<script>
import decorate from "@/charDecorator";
import Talent from "./helper/Talent";

export default {
  props: {
    uuid: {
      type: String,
      default: null,
    },
  },
  components: {
    Talent,
  },
  data() {
    const char = this.$store.state.Characters.characters[this.uuid];
    return { char };
  },
  computed: {
    dChar() {
      return decorate(this.char);
    },
    talents() {
      return this.dChar.talents;
    },
    talentOptions() {
      return this.dChar.talentOptions;
    },
  },
};
</script>

<style scoped lang="scss">
.character-talents {
  .talents,
  .talent-options {
    .talent {
      margin: 0.75rem 0;
      padding: 0 0.5rem;

      &:first-child {
        margin-top: 0.25rem;
      }
    }
  }

  .talent-options {
    margin-top: 1rem;
  }
}
</style>
