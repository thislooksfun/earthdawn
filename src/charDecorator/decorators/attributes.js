// Offset v by 1 so the math works easier
const calculateStepForValue = (v) => 2 + Math.floor((v - 1) / 3);

export default function (char) {
  // Extract the base attributes for the race
  const { race: { baseStats: { attrs: baseAttrs } } } = char

  // Use getters as these rely on other parameters
  char.attrs = {
    // Physical
    get dex() {
      const val = baseAttrs.dex + char._effects._sum('dexVal');
      const step_raw = calculateStepForValue(val) + char._effects._sum('dexStep');
      const step = step_raw - char.health.wounds;
      return { val, step_raw, step }
    },
    get str() {
      const val = baseAttrs.str + char._effects._sum('strVal');
      const step_raw = calculateStepForValue(val) + char._effects._sum('strStep');
      const step = step_raw - char.health.wounds;
      return { val, step_raw, step }
    },
    get tou() {
      const val = baseAttrs.tou + char._effects._sum('touVal');
      const step_raw = calculateStepForValue(val) + char._effects._sum('touStep');
      const step = step_raw - char.health.wounds;
      return { val, step_raw, step }
    },

    // Mental
    get per() {
      const val = baseAttrs.per + char._effects._sum('perVal');
      const step_raw = calculateStepForValue(val) + char._effects._sum('perStep');
      const step = step_raw - char.health.wounds;
      return { val, step_raw, step }
    },
    get wil() {
      const val = baseAttrs.wil + char._effects._sum('wilVal');
      const step_raw = calculateStepForValue(val) + char._effects._sum('wilStep');
      const step = step_raw - char.health.wounds;
      return { val, step_raw, step }
    },
    get cha() {
      const val = baseAttrs.cha + char._effects._sum('chaVal');
      const step_raw = calculateStepForValue(val) + char._effects._sum('chaStep');
      const step = step_raw - char.health.wounds;
      return { val, step_raw, step }
    },
  }
}