import Vue from "vue";
const uuidv4 = require("uuid/v4");

export default {
  TOGGLE_EDIT_MODE(state, uuid) {
    state.characters[uuid].editMode = !state.characters[uuid].editMode;
  },

  SAVE_CHARACTER(state, character) {
    character.uuid = character.uuid || uuidv4();
    Vue.set(state.characters, character.uuid, character);
  },
  DELETE_CHARACTER(state, uuid) {
    Vue.delete(state.characters, uuid);
  },
};
