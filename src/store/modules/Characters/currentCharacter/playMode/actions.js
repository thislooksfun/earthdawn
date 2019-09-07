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
      },
      health: {
        woundThreshold: 1,
      },
    }
    
    const armor = type == 'strain' ? 0 : char.armor[type];
    const amount = Math.max(dmg - armor, 0)
    const wounds = Math.floor(amount / char.health.woundThreshold)
    
    console.log(`Dealing ${amount} damage of type ${type}\n(raw damage: ${dmg}, relevant armor: ${armor}, resulting wounds: ${wounds})`)
    
    commit('DEAL_DAMAGE', { uuid, amount });
    commit('CAUSE_WOUNDS', { uuid, wounds });
  },
  recoverHealth({ commit }, amount) {
    commit('RECOVER_HEALTH', { uuid: routedUUID(), amount });
  },
}