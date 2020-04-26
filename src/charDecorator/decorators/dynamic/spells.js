import spells from "Spells";
import { evalTemplate } from "@/helper/evaluate";
// import actionDiceForStep from "@/helper/actionDiceForStep";

export default function(char) {
  for (const spell in char.spells) {
    const sp = spells[char.discipline.name.toLowerCase()][spell];

    char.spells[spell] = {
      // Load the data from the spell
      ...sp,

      get casting() {
        return evalTemplate(sp.casting || "", char);
      },
      get range() {
        return evalTemplate(sp.range || "", char);
      },
      get duration() {
        return evalTemplate(sp.duration || "", char);
      },
      get effect() {
        return evalTemplate(sp.effect || "", char);
      },
      get areaOfEffect() {
        return evalTemplate(sp.areaOfEffect || "", char);
      },
      get successLevels() {
        return sp.successLevels.map(sl => evalTemplate(sl, char));
      },
      get extraThreads() {
        return sp.extraThreads.map(sl => evalTemplate(sl, char));
      },
    };
  }
}
