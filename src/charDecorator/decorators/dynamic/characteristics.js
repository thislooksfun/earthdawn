// Offset v by 1 so the math works easier
const defenseRatingForValue = v => 2 + Math.floor((v - 1) / 2);

export default function(char) {
  char.characteristics = {
    defense: {
      get physical() {
        return (
          defenseRatingForValue(char.attrs.dex.val) +
          char._effects._sum("physicalDefense")
        );
      },
      get mystic() {
        return (
          defenseRatingForValue(char.attrs.per.val) +
          char._effects._sum("mysticDefense")
        );
      },
      get social() {
        return (
          defenseRatingForValue(char.attrs.cha.val) +
          char._effects._sum("socialDefense")
        );
      },
    },

    // There is no base stat for armor, only those given by items and/or
    // other abilities, all of which expose the result via effects.
    armor: {
      get physical() {
        return char._effects._sum("physicalArmor");
      },
      get mystic() {
        return char._effects._sum("mysticArmor");
      },
    },

    // There is no base stat for shield, only those given by items and/or
    // other abilities, all of which expose the result via effects.
    shield: {
      get physical() {
        return char._effects._sum("physicalShield");
      },
      get mystic() {
        return char._effects._sum("mysticShield");
      },
    },

    get movementRate() {
      return (
        char.race.baseStats.movementRate + char._effects._sum("movementRate")
      );
    },

    get carryingCapacity() {
      // Offset str.val by 1 so the math works easier
      const strVal = char.attrs.str.val;

      // Base value
      let cc = 5;
      // Sum up to desired level
      for (let i = 0; i <= strVal; i++) {
        cc += 5 * Math.ceil(i / 5);
      }
      return cc + char._effects._sum("carryingCapacity");
    },

    get initiative() {
      return char.attrs.dex.step + char._effects._sum("initiative");
    },
  };
}
