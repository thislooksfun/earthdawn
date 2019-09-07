<template>
  <div class="character-wizard-basic-info">
    <label>
      <span class="label">Character Name:</span>
      <input type="text" v-model="name" />
    </label>

    <label>
      <span class="label">Player Name:</span>
      <input type="text" v-model="playerName" />
    </label>

    <label>
      <span class="label">Race:</span>

      <select v-model="race">
        <option disabled value>Please select one</option>
        <option v-for="(r, name) in races.singular" :key="name" :value="name">{{name}}</option>
      </select>
    </label>

    <label>
      <span class="label">Discipline:</span>

      <select v-model="discipline">
        <option disabled value>Please select one</option>
        <option v-for="(d, name) in disciplines" :key="name" :value="name">{{name}}</option>
      </select>
    </label>
  </div>
</template>

<script>
import disciplines from "Disciplines";
import races from "Races";

const filledOut = f => f && f != "";

export default {
  props: {
    uuid: {
      type: String,
      default: null
    }
  },
  data() {
    const char = this.$store.state.Characters.characters[this.uuid];
    return { char, disciplines, races };
  },
  computed: {
    name: {
      get() {
        return this.char.name;
      },
      set(value) {
        this.$store.dispatch("ccSetName", value);
        this.$emit("completed", this.completed);
      }
    },
    playerName: {
      get() {
        return this.char.playerName;
      },
      set(value) {
        this.$store.dispatch("ccSetPlayerName", value);
        this.$emit("completed", this.completed);
      }
    },
    discipline: {
      get() {
        return this.char.discipline;
      },
      set(value) {
        this.$store.dispatch("ccSetDiscipline", value);
        this.$emit("completed", this.completed);
      }
    },
    race: {
      get() {
        return this.char.race;
      },
      set(value) {
        this.$store.dispatch("ccSetRace", value);
        this.$emit("completed", this.completed);
      }
    },

    completed() {
      return (
        filledOut(this.char.name) &&
        filledOut(this.char.playerName) &&
        filledOut(this.char.discipline) &&
        filledOut(this.char.race)
      );
    }
  },
  mounted() {
    this.$emit("completed", this.completed);
  },
  updated() {
    this.$emit("completed", this.completed);
  }
};
</script>

<style scoped lang="scss">
$argon-blue: #5e72e4;

.character-wizard-basic-info {
  label {
    position: relative;

    display: block;
    font-size: 2rem;

    .label {
      position: absolute;
      top: 0;
      z-index: 1;
      font-size: 1.25rem;

      color: #888;
    }

    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      background-position: right 75%;
      background-repeat: no-repeat;
      background-image: url("../../assets/dropdownArrow.svg");
      padding-right: 1.5rem;

      cursor: pointer;

      option {
        font-size: 1rem;
      }
    }

    input,
    select {
      width: 100%;
      padding-top: 1.25rem;

      background-color: white;

      border: 0;
      border-radius: 0;
      border-bottom: 2px solid black;

      margin-bottom: 1rem;

      &:focus {
        outline: none;
        border-color: $argon-blue;
      }
    }
  }
}
</style>