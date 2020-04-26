<template>
  <div
    class="character-header"
    :class="{ editMode: char.editMode, playMode: !char.editMode }"
  >
    <value-label-group size="large" class="name" label="Name" :ttrows="[name]">
      <div class="wrap-container">{{ name }}</div>
    </value-label-group>

    <value-label-group class="race" label="Race" :ttrows="[race]">
      <div class="wrap-container">{{ race }}</div>
    </value-label-group>

    <value-label-group
      class="discipline"
      label="Discipline"
      :ttrows="[discipline]"
    >
      <div class="wrap-container">{{ discipline }}</div>
    </value-label-group>

    <value-label-group class="circle" label="Circle">
      <div class="wrap-container">{{ circle }}</div>
    </value-label-group>
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
  grid-template-columns: minmax(0, 100%) 11rem 12rem 3rem;
  grid-template-rows: auto;
  grid-template-areas: "name race discipline circle";
  grid-gap: 1rem;

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

  .wrap-container {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
