const upperFirst = require('lodash/upperFirst')

const cloneAndPrefixKeys = (obj, prefix) => {
  const oobj = {}
  for (const key in obj) {
    oobj[`${prefix}${upperFirst(key)}`] = obj[key]
  }
  return oobj;
}

import editMode from './editMode'
import playMode from './playMode'
import shared   from './shared'

const mutations = {
  ...editMode.mutations,
  ...playMode.mutations,
  ...shared.mutations,
}

const actions = {
  ...editMode.actions,
  ...playMode.actions,
  ...shared.actions,
}

const getters = {
  ...editMode.getters,
  ...playMode.getters,
  ...shared.getters,
}

export default {
  mutations: cloneAndPrefixKeys(mutations, 'cc'),
  actions:   cloneAndPrefixKeys(actions,   'cc'),
  getters:   cloneAndPrefixKeys(getters,   'cc'),
}