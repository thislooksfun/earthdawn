/**
 * The file enables `Spells` to import all races in a one-shot manner. There
 * should not be any reason to edit this file.
 */

// TODO: Split into helper function
// BODY: This code pattern is repeated several times in the different asset
// BODY: loaders. It should probably be broken out into a helper function.

const files = require.context(".", true, /\.yml$/);
const spells = {};

files.keys().forEach(key => {
  if (key.endsWith("__template__.yml")) return;
  const s = files(key);
  const [discipline, circleStr] = key.split("/").slice(1, 3);

  // Track which circle the spell is
  s.circle = circleStr.slice(7);

  // Ensure that the discipline category exists
  spells[discipline] = spells[discipline] || {};

  // Add options for both singular and plural usage
  spells[discipline][s.name] = s;
});

export default spells;
