import disciplines from "Disciplines";

export default function(char) {
  char.discipline = {
    ...disciplines[char.discipline],
    get "effects!"() {
      return char.discipline.circles
        .slice(0, char.circle)
        .map(c => c.effects)
        .filter(e => e != null);
    },
  };
}
