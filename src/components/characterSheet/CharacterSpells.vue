<template>
  <div class="character-spells">
    <center><h2>Spells</h2></center>

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
        <template v-for="(spells, circle) in spellsByCircle">
          <tr :key="circle">
            <td colspan="10">
              <center>
                <b>Circle {{ circle }} Spells</b>
              </center>
            </td>
          </tr>
          <tr v-for="spell in spells" :key="circle + ':' + spell.name">
            <td>{{ spell.name }}</td>
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
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import decorate from "@/charDecorator";

export default {
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
  computed: {
    dChar() {
      return decorate(this.char);
    },
    spellsByCircle() {
      return Object.values(this.dChar.spells).reduce((o, s) => {
        o[s.circle] = [...(o[s.circle] || []), s];
        return o;
      }, {});
    },
  },
};
</script>
