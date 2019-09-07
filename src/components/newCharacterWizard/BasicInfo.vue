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
      <span class="label">Discipline:</span>

      <select v-model="discipline">
        <option disabled value>Please select one</option>
        <option
          v-for="(d, name) in disciplines"
          :key="name"
          :value="name"
        >{{name}}</option>
      </select>
    </label>
    
    <label>
      <span class="label">Race:</span>

      <select v-model="race">
        <option disabled value>Please select one</option>
        <option
          v-for="(r, name) in races.singular"
          :key="name"
          :value="name"
        >{{name}}</option>
      </select>
    </label>
    
    {{char.languages}}
  </div>
</template>

<script>
import disciplines from 'Disciplines'
import races from 'Races'

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
      }
    },
    playerName: {
      get() {
        return this.char.playerName;
      },
      set(value) {
        this.$store.dispatch("ccSetPlayerName", value);
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

    input {
      width: 100%;
      padding-top: 1.25rem;

      &[type="text"] {
        border: 0;
        border-bottom: 2px solid black;

        &:focus {
          outline: none;
          border-color: $argon-blue;
        }
      }
    }
  }
}
</style>