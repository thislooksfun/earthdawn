import spells from "Spells";
// import actionDiceForStep from "@/helper/actionDiceForStep";

export default function(char) {
  for (const spell in char.spells) {
    char.spells[spell] = {
      // Load the data from the spell
      ...spells[char.discipline.name][spell],
      // The character just stores the rank of the spell, add that too
      rank: char.spells[spell],
    };
  }
}
