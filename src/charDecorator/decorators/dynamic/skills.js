import talents from "Talents";
import skills from "Skills";

export default function(char) {
  for (const skill in char.skills) {
    char.skills[skill] = {
      // Try loading the skill first, and fall back on the talent
      ...(skill in skills ? skills[skill] : talents[skill]),
      // The character just stores the rank of the skill, add that too
      rank: char.skills[skill],
    };
  }
}
