// Offset v by 1 so the math works easier
const calculateStepForValue = (v) => 2 + Math.floor((v - 1) / 3);

export default function (char) {
  // Extract the base attributes for the race
  const {race: {baseStats: {attrs: baseAttrs}}} = char
  
  // Use getters as these rely on other parameters
  char.attrs = {
    // Physical
    get dex() {
      const val = baseAttrs.dex;
      const step = calculateStepForValue(val);
      return { val, step }
    },
    get str() {
      const val = baseAttrs.str;
      const step = calculateStepForValue(val);
      return { val, step }
    },
    get tou() {
      const val = baseAttrs.tou;
      const step = calculateStepForValue(val);
      return { val, step }
    },
    
    // Mental
    get per() {
      const val = baseAttrs.per;
      const step = calculateStepForValue(val);
      return { val, step }
    },
    get wil() {
      const val = baseAttrs.wil;
      const step = calculateStepForValue(val);
      return { val, step }
    },
    get cha() {
      const val = baseAttrs.cha;
      const step = calculateStepForValue(val);
      return { val, step }
    },
  }
}