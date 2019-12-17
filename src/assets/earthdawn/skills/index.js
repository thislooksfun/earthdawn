/**
 * The file enables `Skills` to import all races in a one-shot manner. There
 * should not be any reason to edit this file.
 */

const files = require.context(".", false, /\.yml$/);
const skills = {};

files.keys().forEach(key => {
  if (key.endsWith("__template__.yml")) return;
  const s = files(key);
  // Add options for both singular and plural usage
  skills[s.name] = s;
});

export default skills;
