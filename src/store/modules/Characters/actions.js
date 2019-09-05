export default {
  // List states
  saveCharacter({ commit }, character) {
    commit('SAVE_CHARACTER', character);
  },
  deleteCharacter({ commit }, name) {
    commit('DELETE_CHARACTER', name);
  },
  selectCharacter({ commit }, name) {
    commit('SELECT_CHARACTER', name);
  },
  
  
  // Selected character
  dealDamage({ commit }, { type, amount }) {
    commit('DEAL_DAMAGE', { type, amount });
  },
}