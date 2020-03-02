<template>
  <div
    class="character-header"
    :class="{ editMode: char.editMode, playMode: !char.editMode }"
  >
    <div class="val-label-group name">
      <span class="label">Name</span>
      <span class="value">{{ name }}</span>
    </div>

    <div class="val-label-group race">
      <span class="label">Race</span>
      <span class="value">{{ race }}</span>
    </div>

    <div class="val-label-group discipline">
      <span class="label">Discipline</span>
      <span class="value">{{ discipline }}</span>
    </div>

    <div class="val-label-group circle">
      <span class="label">Circle</span>
      <span class="value">{{ circle }}</span>
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
