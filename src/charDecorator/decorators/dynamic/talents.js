import talents from "Talents";
import actionDiceForStep from "@/helper/actionDiceForStep";

const flatMap = require("lodash/flatMap");

export default function(char) {
  // Get all available talents (remember, the circle array is 0-indexed and
  // char.circle is 1-indexed, but slice is [S,E))
  const relevantCircles = char.discipline.circles.slice(0, char.circle);

  // Gather all discipline talents accessible for the relevant circles
  const disciplineTalents = flatMap(relevantCircles, c => {
    const talents = (c.talents || []).map(t => ({ name: t, free: false }));
    const freeTalents = (c.freeTalents || []).map(t => ({
      name: t,
      free: true,
    }));
    return talents.concat(freeTalents);
  });

  // Assign all info for each talent
  const decoratedTalents = disciplineTalents.map(({ name, free }) => {
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
        return actionDiceForStep(this.step);
      },
    };
  });

  // Convert from array to object
  char.talents = decoratedTalents.reduce((o, t) => ({ ...o, [t.name]: t }), {});

  // TODO: Decorate talent options

  // Assign all info for each talent
  const decoratedTalentOptions = char._stored.talentOptions.map(
    ({ name }, i) => {
      return {
        ...talents[name],
        get rank() {
          return char._stored.talentOptions[i].rank;
        },
        get step() {
          if (this.attr) {
            return this.rank + char.attrs[this.attr].step;
          } else {
            return this.rank;
          }
        },
        get actionDice() {
          return actionDiceForStep(this.step);
        },
      };
    }
  );

  char.talentOptions = decoratedTalentOptions;
}
