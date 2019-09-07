import template from '@/assets/characterTemplate'
import router from '@/router'
const cloneDeep = require('lodash/cloneDeep');

export default {
  createAndSelectNewCharacter({ commit }) {
    const character = cloneDeep(template);
    commit('SAVE_CHARACTER', character);
    router.push({
      name: 'character',
      params: { uuid: character.uuid }
    });
  },
  saveCharacter({ commit }, character) {
    commit('SAVE_CHARACTER', character);
  },
  deleteCharacter({ commit }, uuid) {
    commit('DELETE_CHARACTER', uuid);
  },
}