<template>
  <div class="equipment">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(count, name) in equipment" :key="name">
          <td>{{ name }}</td>
          <td>{{ count }}</td>
        </tr>
      </tbody>
    </table>

    <div v-for="(choices, key) in itemChoices" :key="key" class="itemChoice">
      {{ key }}:
      <base-button
        v-for="c in choices"
        :key="c"
        size="sm"
        :type="c in equipment ? 'primary' : 'secondary'"
        @click="chooseItem(key, c)"
        >{{ c }}</base-button
      >
    </div>
  </div>
</template>

<script>
import decorate from "@/charDecorator";
// import equipment from "Equipment";

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
  methods: {
    chooseItem(group, name) {
      const opts = this.itemChoices[group];
      if (!opts || !opts.includes(name)) {
        // Invalid group/group+name.
        return;
      }

      opts.forEach(itm => {
        this.$store.dispatch("ccRemoveItem", { name: itm, count: Infinity });
      });
      this.$store.dispatch("ccAddItem", { name });
    },
  },
  computed: {
    dChar() {
      return decorate(this.char);
    },
    equipment() {
      return this.dChar.equipment;
    },
    itemChoices() {
      return {
        "Traveler's Garb": ["Robe", "Breeches"],
        Weapon: ["Dagger", "Knife", "Other"],
        "Artisan Tools": ["none"],
      };
    },
  },
  mounted() {
    this.$store.dispatch("ccRemoveItem", { name: "Grimoire", count: Infinity });
    if (this.dChar.discipline.isSpellcaster) {
      this.$store.dispatch("ccAddItem", { name: "Grimoire" });
    }
    this.$emit("completed", true);
  },
};
</script>

<style scoped lang="scss">
.equipment {
  table {
    &,
    th,
    td {
      border: 1px solid var(--table-primary);
    }

    th,
    td {
      padding: 0.25rem 0.5rem;
    }
  }
}
</style>
