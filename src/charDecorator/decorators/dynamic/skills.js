import talents from "Talents";
import skills from "Skills";

export default function(char) {
  for (const skill in char.skills) {
    // Combine existing inline values with those from the skill definition
    char.skills[skill] = {
      // Try loading the skill first, and fall back on the talent
      ...(skill in skills ? skills[skill] : talents[skill]),
      ...char.skills[skill],
    };
  }
}
