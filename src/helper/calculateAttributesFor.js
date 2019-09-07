import races from 'Races'

export default function(char) {
  const race = races.singular[char.race]
  return {
    ...race.baseStats.attrs
  }
}