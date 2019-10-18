import spells from "Talents";
// import actionDiceForStep from "@/helper/actionDiceForStep";

export default function(char) {
  // Assign all info for each spell
  const decoratedTalents = char._stored.spells.map(({ name }) => {
    return {
      ...spells[name],
      get rank() {
        return char._stored.spells[name];
      },
      // get step() {
      //   if (this.attr) {
      //     return this.rank + char.attrs[this.attr].step;
      //   } else {
      //     return this.rank;
      //   }
      // },
      // get actionDice() {
      //   // return actionDiceForStep(this.step);
      //   return "NNNN";
      // },
    };
  });

  // Convert from array to object
  char.spells = decoratedTalents.reduce((o, t) => ({ ...o, [t.name]: t }), {});
}
