import decorators from './decorators'

const cloneDeep = require('lodash/cloneDeep');

export default function (char) {
  // Make a deep clone so we don't mess with the saved character information
  const c = cloneDeep(char);
  
  // Apply each decorator
  decorators.forEach(d => d(c));
  
  // Return the final result
  return c;
}