import talents from "Talents";

function decorateTalents(ts) {
  for (const talent in ts) {
    // Combine existing inline values with those from the talent definition
    ts[talent] = {
      ...talents[talent],
      ...ts[talent],
    };
  }
}

export default function(char) {
  decorateTalents(char.talents.discipline);
  decorateTalents(char.talents.other);
}
