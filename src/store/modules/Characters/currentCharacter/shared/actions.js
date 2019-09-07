// All actions defined in this file will be prefixed with 'cc'
// Example: setName -> ccSetName

import router from '@/router'
const routedUUID = () => router.currentRoute.params.uuid;

export default {
  toggleEditMode({ commit }) {
    commit('TOGGLE_EDIT_MODE', routedUUID());
  },
}