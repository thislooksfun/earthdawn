<template>
  <div class="character-list">
    <h1>Characters</h1>

    <ul>
      <li
        v-for="(char, uuid) in characters"
        :key="uuid"
        class="character"
        :class="{ selected: $route.params.uuid == uuid }"
      >
        <div class="button">
          <base-button
            type="danger"
            size="sm"
            icon="fa fa-trash-o"
            @click="deleteCharacter(char.name, uuid)"
            style="font-size: 0.75rem"
          ></base-button>
        </div>
        <div class="link">
          <router-link :to="`/character/${uuid}`">{{ char.name }}</router-link>
        </div>
      </li>
      <li style="text-align: center; margin-top: 1em;">
        <base-button type="success" @click="createAndSelectNewCharacter()">New Character</base-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      characters: this.$store.state.Characters.characters
    };
  },
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
      const characters = this.$store.state.Characters.characters;
      const uuids = Object.keys(characters);

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
    }
  },
  mounted() {
    this.selectFirstCharacter();
  }
};
</script>

<style lang="scss">
.character-list {
  position: relative;
  height: 100%;

  overflow: scroll;

  padding: 0.25rem;

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

        padding: 0.25rem;

        border-bottom: 1px solid #aaa;

        display: grid;
        grid-template-columns: 2rem auto;
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

            .selected & {
              background-color: rgba(0, 0, 0, 0.5);
              color: white;
            }
          }
        }
      }
    }
  }
}
</style>