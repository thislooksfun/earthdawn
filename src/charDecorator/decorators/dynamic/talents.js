import talents from "Talents";

export default function(char) {
  // Decorate talents
  char.talents = char.discipline.circles
    // Get all available talents (remember, the circle array is 0-indexed and
    // char.circle is 1-indexed, but slice is [S,E))
    .slice(0, char.circle)
    .flatMap(c => {
      const talents = (c.talents || []).map(t => ({ name: t, free: false }));
      const freeTalents = (c.freeTalents || []).map(t => ({
        name: t,
        free: true,
      }));
      return talents.concat(freeTalents);
    })
    // Assign all info for each talent
    .map(({ name, free }) => {
      return {
        ...talents[name],
        get rank() {
          // TODO: Add houserule options for what happens when a talent becomes a free talent.
          // DESC: #12
          return free ? char.circle : char._stored.talents[name] || 0;
        },
        get step() {
          if (this.attr) {
            return this.rank + char.attrs[this.attr].step;
          } else {
            return this.rank;
          }
        },
        get actionDice() {
          // TODO: Implement step -> action dice conversion
          return `Dice for step ${this.step}`;
        },
      };
    })
    // Convert from array to object
    .reduce((o, t) => ({ ...o, [t.name]: t }), {});

  // TODO: Decorate talent options
}
