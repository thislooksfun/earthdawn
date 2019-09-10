import decorators from "./decorators";

const cloneDeep = require("lodash/cloneDeep");

export default function(char) {
  // Make a deep clone so we don't mess with the saved character information
  const c = cloneDeep(char);

  // Store a reference to the underlying stored value, in case any decorators
  // want to see the raw stored value before any decoration took place.
  c._stored = char;
  
  // Apply each decorator
  decorators.forEach(d => d(c));

  // Return the final result
  return c;
}
