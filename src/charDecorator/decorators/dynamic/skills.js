import talents from "Talents";
import skills from "Skills";

export default function(char) {
  char.skills = {};

  for (const name in char._stored.skills) {
    const skill = {
      // Load in the name, but let the skill overwrite it
      name,
      // Try loading the skill first, and fall back on the talent
      ...(name in skills ? skills[name] : talents[name]),
      // The character stores the rank and type of the skill
      ...char._stored.skills[name],
    };

    const type = skill.type || "other";
    char.skills[type] = char.skills[type] || {};
    char.skills[type][name] = skill;
  }
}
