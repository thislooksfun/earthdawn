<template>
  <div class="character-list">
    <h1>Characters</h1>

    <ul>
      <li
        v-for="char in sortedCharacters"
        :key="char.uuid"
        class="character"
        :class="{ selected: $route.params.uuid == char.uuid }"
      >
        <div class="button">
          <base-button
            type="danger"
            size="sm"
            :icon="['far', 'trash-alt']"
            @click="deleteCharacter(char.name, char.uuid)"
            style="font-size: 0.9rem"
          ></base-button>
        </div>
        <div class="link">
          <router-link :to="`/character/${char.uuid}`">{{
            char.name
          }}</router-link>
        </div>
      </li>
      <li style="text-align: center; margin-top: 1em;">
        <base-button type="success" @click="createAndSelectNewCharacter()"
          >New Character</base-button
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    deleteCharacter(name, uuid) {
      const confirmMsg = `Are you sure you want to delete ${name}? This action cannot be undone.`;
      if (confirm(confirmMsg)) {
        if (this.$route.params.uuid == uuid) {
          this.selectFirstCharacter(true, uuid);
        }
        this.$store.dispatch("deleteCharacter", uuid);
      }
    },
    selectFirstCharacter(fromDeleteCharacter, deletingUUID) {
      const uuids = this.sortedCharacters.map(c => c.uuid);

      if (uuids.length == (fromDeleteCharacter ? 1 : 0)) {
        this.createAndSelectNewCharacter();
      } else {
        // If the UUID we are about to delete is the current first character,
        // select the second one instead.
        const uuid =
          fromDeleteCharacter && deletingUUID == uuids[0] ? uuids[1] : uuids[0];

        // If we're already on that page, don't bother
        if (uuid != this.$route.params.uuid) {
          this.$router.push(`/character/${uuid}`);
        }
      }
    },
    createAndSelectNewCharacter() {
      this.$store.dispatch("createAndSelectNewCharacter");
    },
  },
  computed: {
    sortedCharacters() {
      const chars = Object.values(this.$store.state.Characters.characters);
      return chars.sort((a, b) => {
        // Sort based on name first, and UUID second (so sort order is still
        // defined if two characters have the same name).
        const aa = a.name.toLowerCase() + a.uuid;
        const bb = b.name.toLowerCase() + b.uuid;
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      });
    },
  },
  mounted() {
    this.selectFirstCharacter();
  },
};
</script>

<style lang="scss" scoped>
.character-list {
  position: relative;
  height: 100%;

  background-color: var(--background-primary);
  overflow: scroll;

  h1 {
    width: 100%;
    text-align: center;
  }

  ul {
    position: relative;
    width: 100%;

    padding: 0;

    li {
      position: relative;

      list-style-type: none;

      box-sizing: border-box;
      width: 100%;

      &.character {
        font-size: 1.25rem;

        padding: 0.4rem 0.5rem;

        border-bottom: 1px solid var(--background-secondary);

        display: grid;
        grid-template-columns: 2.25rem auto;
        grid-template-rows: auto;
        grid-template-areas: "button link";

        .button {
          grid-area: button;
        }

        .link {
          grid-area: link;

          a {
            display: block;
            width: 100%;
          }
        }
      }

      &.selected {
        background-color: var(--background-secondary);
        font-weight: 500;
      }
    }
  }
}
</style>
