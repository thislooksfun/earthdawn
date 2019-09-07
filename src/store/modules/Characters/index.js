import state from './state'

import editMode from './editMode'
import playMode from './playMode'
import shared from './shared'

import cc from './currentCharacter'

export default {
  state,

  mutations: {
    ...editMode.mutations,
    ...playMode.mutations,
    ...shared.mutations,
    ...cc.mutations,
  },
  actions: {
    ...editMode.actions,
    ...playMode.actions,
    ...shared.actions,
    ...cc.actions,
  },
  getters: {
    ...editMode.getters,
    ...playMode.getters,
    ...shared.getters,
    ...cc.getters,
  },
}