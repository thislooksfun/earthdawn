// All getters defined in this file will be prefixed with 'cc'
// Example: characterName -> ccCharacterName

import races from "Races";

export default {
  attributes: (state, getters) => {
    const char = getters.currentCharacter;
    if (char == null) return {}; //no character selected

    // Character races are always stored in the singular form
    const race = races.singular[char.race];

    // Makes a SHALLOW clone
    const attrs = Object.assign({}, race.baseAttrs);

    return attrs;
  },
  health: (state, getters) => {
    const char = getters.currentCharacter;
    if (char == null) return {}; //no character selected

    // Grab a reference to the character's health object
    // const a = getters.ccAttributes
    // const h = char.health;

    // Calculate
    /*
    // Health
    health: {
      recoveryTests: {
        remaining: 0,
        perDay: 3,
        step: 7,
      },

      // woundThreshold: 13,   (calculated from attributes [tou])
      // unconsciousness: 46,  (calculated from attributes [tou])
      // death: 55,            (calculated from [unconsciousness] + [tou step])

      wounds: 0,

      bloodMagic: 0,
      currentDamage: 0,
      currentStrain: 0,
    },
    */
  },
};
