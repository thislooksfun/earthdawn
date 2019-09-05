import Vue from 'vue';
const uuidv4 = require('uuid/v4');

export default {
  // List states
  SAVE_CHARACTER(state, character) {
    character.uuid = character.uuid || uuidv4();
    Vue.set(state.characters, character.uuid, character);
  },
  DELETE_CHARACTER(state, uuid) {
    Vue.delete(state.characters, uuid);
  },
  SELECT_CHARACTER(state, uuid) {
    state.selected = uuid;
  },
  
  
  // Selected character
  DEAL_DAMAGE(state, {type, amount}) {
    const character = state.getters.selectedCharacter;
    const dmg = amount - character.armor[type];
    character.health.damage += dmg;
  }
}