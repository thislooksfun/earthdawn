import races from 'Races';
import disciplines from 'Disciplines'
// import talents from 'Talents'
// import skills from 'Skills'

const cloneDeep = require('lodash/cloneDeep');

export default function (char) {
  // Make a clone so we don't overwrite the character itself
  const c = cloneDeep(char);
  
  c.race = races.singular[c.race];
  c.discipline = disciplines[c.discipline];
  
  return c;
}