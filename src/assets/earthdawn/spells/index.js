/**
 * The file enables `Spells` to import all races in a one-shot manner. There
 * should not be any reason to edit this file.
 */

// TODO: Split into helper function
// BODY: This code pattern is repeated several times in the different asset
// BODY: loaders. It should probably be broken out into a helper function.

const files = require.context(".", false, /\.yml$/);
const spells = {};

files.keys().forEach(key => {
  if (key.endsWith("__template__.yml")) return;
  const s = files(key);
  // Add options for both singular and plural usage
  spells[s.name] = s;
});

export default spells;
