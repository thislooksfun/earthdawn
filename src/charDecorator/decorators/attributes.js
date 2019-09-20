// Offset v by 1 so the math works easier
const calculateStepForValue = v => 2 + Math.floor((v - 1) / 3);

export default function(char) {
  // Extract the base attributes for the race
  const {
    race: {
      baseStats: { attrs: baseAttrs },
    },
  } = char;

  const calculateFor = attr => {
    const val = baseAttrs[attr] + char._effects._sum(`${attr}Val`);
    const step_raw =
      calculateStepForValue(val) + char._effects._sum(`${attr}Step`);
    const step = step_raw - char.health.wounds;
    return { val, step_raw, step };
  };

  // Use getters as these rely on other parameters
  char.attrs = {
    // Physical
    get dex() {
      return calculateFor("dex");
    },
    get str() {
      return calculateFor("str");
    },
    get tou() {
      return calculateFor("tou");
    },

    // Mental
    get per() {
      return calculateFor("per");
    },
    get wil() {
      return calculateFor("wil");
    },
    get cha() {
      return calculateFor("cha");
    },
  };
}
