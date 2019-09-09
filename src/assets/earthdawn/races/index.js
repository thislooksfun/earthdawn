/**
 * The file enables `Races` to import all races in a one-shot manner. There
 * should not be any reason to edit this file.
 */

const files = require.context(".", false, /\.yml$/);
const races = { singular: {}, plural: {} };

files.keys().forEach(key => {
  if (key.endsWith("__template__.yml")) return;
  const r = files(key);
  // Add options for both singular and plural usage
  races.singular[r.name.singular] = r;
  races.plural[r.name.plural] = r;
});

export default races;
