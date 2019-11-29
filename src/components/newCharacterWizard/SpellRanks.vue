<template>
  <div class="spell-ranks">
    <div class="remaining-points">Remaining points: {{ remainingPoints }}</div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Threads</th>
          <th>Weaving</th>
          <th>Casting</th>
          <th>Range</th>
          <th>Duration</th>
          <th>Effect</th>
          <th>Area of Effect</th>
          <th>Success Levels</th>
          <th>Extra Threads</th>
        </tr>
      </thead>
      <tbody>
        <!-- First Circle Spells -->
        <tr>
          <td colspan="10">
            <center><b>First Circle Spells</b></center>
          </td>
        </tr>
        <tr v-for="spell in spellsForCircle(1)" :key="spell.name">
          <td>
            <div class="spell-name">
              <span class="name">{{ spell.name }}</span>
              <base-button
                type="danger"
                size="sm"
                :icon="['far', 'trash-alt']"
                @click="removeSpell(spell.name)"
                style="font-size: 0.9rem"
                class="remove-btn"
              ></base-button>
            </div>
          </td>
          <td>{{ spell.threads }}</td>
          <td>{{ spell.weaving }}</td>
          <td>{{ spell.casting }}</td>
          <td>{{ spell.range }}</td>
          <td>{{ spell.duration }}</td>
          <td>{{ spell.effect }}</td>
          <td>{{ spell.areaOfEffect }}</td>
          <td>{{ spell.successLevels }}</td>
          <td>{{ spell.extraThreads }}</td>
        </tr>
        <tr>
          <td colspan="10">
            <div class="new-spell">
              <select v-model="selectedSpell1">
                <option disabled value>Please select one</option>
                <option
                  v-for="name in availableSpellNames(1)"
                  :key="name"
                  :value="name"
                  >{{ name }}</option
                >
              </select>

              <base-button
                class="add-spell-btn"
                type="primary"
                size="sm"
                :disabled="remainingPoints < 1 || !selectedSpell1"
                @click="
                  addSpell(selectedSpell1);
                  selectedSpell1 = '';
                "
                >Add Spell</base-button
              >
            </div>
          </td>
        </tr>

        <!-- Second Circle Spells -->
        <tr>
          <td colspan="10">
            <center><b>Second Circle Spells</b></center>
          </td>
        </tr>
        <tr v-for="spell in spellsForCircle(2)" :key="spell.name">
          <td>
            <div class="spell-name">
              <span class="name">{{ spell.name }}</span>
              <base-button
                type="danger"
                size="sm"
                :icon="['far', 'trash-alt']"
                @click="removeSpell(spell.name)"
                style="font-size: 0.9rem"
                class="remove-btn"
              ></base-button>
            </div>
          </td>
          <td>{{ spell.threads }}</td>
          <td>{{ spell.weaving }}</td>
          <td>{{ spell.casting }}</td>
          <td>{{ spell.range }}</td>
          <td>{{ spell.duration }}</td>
          <td>{{ spell.effect }}</td>
          <td>{{ spell.areaOfEffect }}</td>
          <td>{{ spell.successLevels }}</td>
          <td>{{ spell.extraThreads }}</td>
        </tr>
        <tr>
          <td colspan="10">
            <div class="new-spell">
              <select v-model="selectedSpell2">
                <option disabled value>Please select one</option>
                <option
                  v-for="name in availableSpellNames(2)"
                  :key="name"
                  :value="name"
                  >{{ name }}</option
                >
              </select>

              <base-button
                class="add-spell-btn"
                type="primary"
                size="sm"
                :disabled="remainingPoints < 2 || !selectedSpell2"
                @click="
                  addSpell(selectedSpell2);
                  selectedSpell2 = '';
                "
                >Add Spell</base-button
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import decorate from "@/charDecorator";
import spells from "Spells";

export default {
  props: {
    uuid: {
      type: String,
      default: null,
    },
  },
  data() {
    const char = this.$store.state.Characters.characters[this.uuid];
    return { char, selectedSpell1: "", selectedSpell2: "" };
  },
  methods: {
    setSpellRank(name, rank) {
      this.$store.dispatch("ccSetSpellRank", { name, rank });
    },
    addSpell(name) {
      // No name given
      if (!name) return;
      this.$store.dispatch("ccAddSpell", { name });
    },
    removeSpell(name) {
      this.$store.dispatch("ccRemoveSpell", { name });
    },
    spellsForCircle(c) {
      return Object.values(this.dChar.spells).filter(s => s.circle == c);
    },
    availableSpellNames(circle) {
      return Object.values(spells[this.char.discipline.toLowerCase()])
        .filter(s => s.circle == circle && !(s.name in this.char.spells))
        .map(s => s.name);
    },
  },
  computed: {
    dChar() {
      return decorate(this.char);
    },
    remainingPoints() {
      return (
        this.dChar.attrs.per.step -
        this.spellsForCircle(1)
          .concat(this.spellsForCircle(2))
          .map(s => s.circle)
          .reduce((t, v) => t + v, 0)
      );
    },
  },
  mounted() {
    this.$emit("completed", true);
  },
};
</script>

<style scoped lang="scss">
.spell-ranks {
}

.new-spell {
  margin-top: 0.25rem;

  select {
    margin-right: 1rem;
  }
}

.other-spell {
  display: grid;
  grid-template-columns: auto 2rem;
  grid-template-rows: auto;
  grid-template-areas: "name remove-btn";

  .name {
    grid-area: name;
  }
  .remove-btn {
    grid-area: remove-btn;
  }
}
</style>
