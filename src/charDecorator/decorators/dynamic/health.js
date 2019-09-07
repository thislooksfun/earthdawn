export default function (char) {
  char.health.recoveryTests = {
    ...char.health.recoveryTests,

    get perDay() {
      // Offset tou.val by 1 so the math works easier
      return 1 + Math.floor((char.attrs.tou.val - 1) / 6);
    },
    get step() {
      return char.attrs.tou.step;
    }
  }

  char.health = {
    ...char.health,

    get unconsciousnessThreshold() {
      return char.attrs.tou.val * 2;
    },

    get deathThreshold() {
      return this.unconsciousnessThreshold + char.attrs.tou.step;
    },

    get woundThreshold() {
      // Offset tou.val by 1 so the math works easier
      return 3 + Math.floor((char.attrs.tou.val - 1) / 2);
    },
  }
}