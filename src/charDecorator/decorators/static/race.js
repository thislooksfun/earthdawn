import races from "Races";

export default function(char) {
  char.race = races.singular[char.race];
}
