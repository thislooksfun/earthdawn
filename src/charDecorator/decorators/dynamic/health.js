export default function (char) {
  // Extract toughness attr
  const { attrs: { tou } } = char;


  // Inject getters into recoveryTests subsection
  char.health.recoveryTests = {
    ...char.health.recoveryTests,

    get perDay() {
      // Offset tou.val by 1 so the math works easier
      return 1 + Math.floor((tou.val - 1) / 6) + char._effects._sum('recoveryTestsPerDay');
    },
    get step() {
      return tou.step + char._effects._sum('recoveryTestStep');
    }
  }


  // Inject getters into main health section
  char.health = {
    ...char.health,

    get unconsciousnessThreshold() {
      return tou.val * 2 + char._effects._sum('unconsciousnessThreshold');
    },

    get deathThreshold() {
      return this.unconsciousnessThreshold + tou.step_raw + char._effects._sum('deathThreshold');
    },

    get woundThreshold() {
      // Offset tou.val by 1 so the math works easier
      return 3 + Math.floor((tou.val - 1) / 2) + char._effects._sum('woundThreshold');
    },
  }
}