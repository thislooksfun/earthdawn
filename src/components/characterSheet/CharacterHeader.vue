<template>
  <div
    class="character-header"
    :class="{ editMode: char.editMode, playMode: !char.editMode }"
  >
    <div class="section name">
      <span class="label">Name</span>
      <span>{{ name }}</span>
    </div>

    <div class="section race">
      <span class="label">Race</span>
      <span>{{ race }}</span>
    </div>

    <div class="section discipline">
      <span class="label">Discipline</span>
      <span>{{ discipline }}</span>
    </div>

    <div class="section circle">
      <span class="label">Circle</span>
      <span>{{ circle }}</span>
    </div>
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

  h1 {
    margin: 0;
  }

  .section {
    position: relative;
    display: inline-block;
    font-size: 1.75rem;

    span {
      display: block;
    }

    .label {
      top: 0;
      left: 0;
      font-size: 1rem;
      color: var(--text-secondary);
      margin-bottom: -0.5rem;
    }

    &.name {
      grid-area: name;
    }

    &.race {
      grid-area: race;
    }

    &.discipline {
      grid-area: discipline;
    }

    &.circle {
      grid-area: circle;
    }
  }
}
</style>
