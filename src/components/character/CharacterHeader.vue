<template>
  <div class="character-header" :class="{editMode: char.editMode, playMode: !char.editMode}">
    <!-- Edit Mode -->
    <h1 v-if="char.editMode" class="editing">
      Name:
      <input class="inline" type="text" v-model="name" />
      <br />Discipline:
      <input class="inline" type="text" v-model="discipline" />
      <br />Circle:
      <input type="number" v-model="circle" />
      <br />Race:
      <input class="inline" type="text" v-model="race" />
    </h1>

    <!-- Play Mode -->
    <h1 v-if="!char.editMode">{{name}}: Circle {{circle}} {{race}} {{discipline}}</h1>
  </div>
</template>

<script>
export default {
  props: {
    uuid: {
      type: String,
      default: null
    }
  },
  methods: {
    saveCharName({ data }) {
      console.log("Setting name to", data);
      this.$store.dispatch("ccSetName", data);
    }
  },
  data() {
    const char = this.$store.state.Characters.characters[this.uuid];
    return {
      char
    };
  },
  computed: {
    name: {
      get() {
        return this.char.name;
      },
      set(value) {
        this.$store.dispatch("ccSetName", value);
      }
    },
    circle: {
      get() {
        return this.char.circle;
      },
      set(value) {
        this.$store.dispatch("ccSetCircle", value);
      }
    },
    discipline: {
      get() {
        return this.char.discipline;
      },
      set(value) {
        this.$store.dispatch("ccSetDiscipline", value);
      }
    },
    race: {
      get() {
        return this.char.race;
      },
      set(value) {
        this.$store.dispatch("ccSetRace", value);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.character-header {
  .playMode {
    text-align: center;
  }

  h1 {
    margin: 0;
  }
}
</style>