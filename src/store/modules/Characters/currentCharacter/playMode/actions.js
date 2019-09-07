// All actions defined in this file will be prefixed with 'cc'
// Example: setName -> ccSetName

import router from '@/router'
const routedUUID = () => router.currentRoute.params.uuid;

export default {
  dealDamage({ commit }, {type, dmg}) {
    const uuid = routedUUID()
    // const char = getters.charForUUID(uuid)
    const char = {
      armor: {
        physical: -1,
        mystic: 0,
      }
    }
    
    const armor = type == 'strain' ? 0 : char.armor[type];
    const amount = Math.max(dmg - armor, 0)
    
    console.log(`Dealing ${amount} damage of type ${type}\n(raw damage: ${dmg}, relevant armor: ${armor})`)
    
    commit('DEAL_DAMAGE', { uuid, amount });
  },
  recoverHealth({ commit }, amount) {
    commit('RECOVER_HEALTH', { uuid: routedUUID(), amount });
  },
}