export default function (char) {
  // Inject getters into karmasection
  char.karma = {
    ...char.karma,

    get max() {
      return char.race.baseStats.karmaMod * char.circle + char._effects._sum('karmaMax');
    },
    get current() {
      return char.karma.max - char.karma.used;
    },
  }
}