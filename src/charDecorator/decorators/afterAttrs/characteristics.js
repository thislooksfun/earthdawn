
/*
5:  10,  15,  20,  25,  30
10: 40,  50,  60,  70,  80
15: 95,  110, 125, 140, 155
20: 175, 195, 215, 235, 255
25: 280, 305, 330, 355, 380
30: 
*/


export default function (char) {
  char.characteristics = {
    get defense() {
      return {
        physical: 0,
        mystic: 0,
        social: 0
      }
    },

    get armor() {
      return {
        physical: 0,
        mystic: 0,
      }
    },

    get shield() {
      return {
        physical: 0,
        mystic: 0,
      }
    },

    get movementRate() {
      return char.race.baseStats.movementRate;
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
      return cc
    },

    get initiative() {
      return 0;
    },
  }
}