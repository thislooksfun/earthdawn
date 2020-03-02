<template>
  <div
    class="character-header"
    :class="{ editMode: char.editMode, playMode: !char.editMode }"
  >
    <value-label-group class="name" label="Name">{{ name }}</value-label-group>
    <value-label-group class="race" label="Race">{{ race }}</value-label-group>
    <value-label-group
      class="discipline"
      label="Discipline"
      :value="discipline"
    />
    <value-label-group class="circle" label="Circle" :value="circle" />
  </div>
</template>

<script>
export default {
  props: {
    uuid: {
      type: String,
      default: null,
    },
  },
  methods: {
    saveCharName({ data }) {
      console.log("Setting name to", data);
      this.$store.dispatch("ccSetName", data);
    },
  },
  data() {
    const char = this.$store.state.Characters.characters[this.uuid];
    return {
      char,
    };
  },
  computed: {
    name: {
      get() {
        return this.char.name;
      },
      set(value) {
        this.$store.dispatch("ccSetName", value);
      },
    },
    circle: {
      get() {
        return this.char.circle;
      },
      set(value) {
        this.$store.dispatch("ccSetCircle", value);
      },
    },
    discipline: {
      get() {
        return this.char.discipline;
      },
      set(value) {
        this.$store.dispatch("ccSetDiscipline", value);
      },
    },
    race: {
      get() {
        return this.char.race;
      },
      set(value) {
        this.$store.dispatch("ccSetRace", value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.character-header {
  display: grid;
  grid-template-columns: 33% auto auto auto;
  grid-template-rows: auto;
  grid-template-areas: "name race discipline circle";

  & > .name {
    grid-area: name;
  }
  & > .race {
    grid-area: race;
  }
  & > .discipline {
    grid-area: discipline;
  }
  & > .circle {
    grid-area: circle;
  }
}
</style>
