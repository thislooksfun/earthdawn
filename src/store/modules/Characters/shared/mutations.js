import Vue from "vue";
const uuidv4 = require("uuid/v4");

export default {
  TOGGLE_EDIT_MODE(state, uuid) {
    state.characters[uuid].editMode = !state.characters[uuid].editMode;
  },

  SAVE_CHARACTER(state, character) {
    if (character.uuid == null) {
      // Ensure that, in the *astronomically* small chance that two UUIDs
      // conflict that no characters will be overwritten.
      let uuid;
      do {
        uuid = uuidv4();
      } while (state.characters[uuid] != null);
      character.uuid = uuid;
    }
    Vue.set(state.characters, character.uuid, character);
  },
  DELETE_CHARACTER(state, uuid) {
    Vue.delete(state.characters, uuid);
  },
};
