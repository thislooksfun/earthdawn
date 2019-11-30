// All actions defined in this file will be prefixed with 'cc'
// Example: setName -> ccSetName

import router from "@/router";
import decorate from "@/charDecorator";

const routedUUID = () => router.currentRoute.params.uuid;

export default {
  dealDamage({ commit, state }, { type, dmg }) {
    const uuid = routedUUID();
    // NOTE: This creates a CLONE of the character object, so any setters here
    // won't work (though they shouldn't be used outside of the mutator itself
    // anyway).
    const char = decorate(state.characters[uuid]);

    const armor = type == "strain" ? 0 : char.characteristics.armor[type];
    const amount = Math.max(dmg - armor, 0);

    const msg1 = `Dealing ${amount} damage of type ${type}`;
    const msg2 = `(raw damage: ${dmg}, relevant armor: ${armor})`;
    console.log(`${msg1}\n${msg2}`);

    commit("DEAL_DAMAGE", { uuid, amount });

    if (amount >= char.health.woundThreshold) {
      commit("CAUSE_WOUND", { uuid });
    }
  },

  recoverHealth({ commit }, amount) {
    commit("RECOVER_HEALTH", { uuid: routedUUID(), amount });
  },

  // Karma
  useKarma({ commit }) {
    commit("USE_KARMA", { uuid: routedUUID() });
  },
};
