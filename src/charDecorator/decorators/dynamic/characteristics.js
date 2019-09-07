// Offset v by 1 so the math works easier
const defenseRatingForValue = (v) => 2 + Math.floor((v - 1) / 2);

export default function (char) {
  char.characteristics = {
    get defense() {
      return {
        physical: defenseRatingForValue(char.attrs.dex.val) + char._effects._sum('physicalDefense'),
        mystic: defenseRatingForValue(char.attrs.per.val) + char._effects._sum('mysticDefense'),
        social: defenseRatingForValue(char.attrs.cha.val) + char._effects._sum('socialDefense'),
      }
    },

    get armor() {
      // There is no base stat for armor, only those given by items and/or
      // other abilities, all of which expose the result via effects.
      return {
        physical: char._effects._sum('physicalArmor'),
        mystic: char._effects._sum('mysticArmor'),
      }
    },

    get shield() {
      // There is no base stat for shield, only those given by items and/or
      // other abilities, all of which expose the result via effects.
      return {
        physical: char._effects._sum('physicalShield'),
        mystic: char._effects._sum('mysticShield'),
      }
    },

    get movementRate() {
      return char.race.baseStats.movementRate + char._effects._sum('movementRate');
    },

    get carryingCapacity() {
      // Offset str.val by 1 so the math works easier
      const strVal = char.attrs.str.val;
      
      // Base value
      let cc = 5;
      // Sum up to desired level
      for (let i = 0; i < strVal; i++) {
        cc += 5 * Math.floor(i / 5);
      }
      return cc + char._effects._sum('carryingCapacity')
    },

    get initiative() {
      return char.attrs.dex.step + char._effects._sum('initiative');
    },
  }
}