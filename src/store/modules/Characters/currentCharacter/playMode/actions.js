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
    const wounds = Math.floor(amount / char.health.woundThreshold);

    console.log(
      `Dealing ${amount} damage of type ${type}\n(raw damage: ${dmg}, relevant armor: ${armor}, resulting wounds: ${wounds})`
    );

    commit("DEAL_DAMAGE", { uuid, amount });
    commit("CAUSE_WOUNDS", { uuid, wounds });
  },

  recoverHealth({ commit }, amount) {
    commit("RECOVER_HEALTH", { uuid: routedUUID(), amount });
  },
};
