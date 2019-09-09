/**
 * The file enables `Races` to import all races in a one-shot manner. There
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

// TODO: MERGE RESULT WITH TALENTS THAT CAN BE USED AS A SKILL
export default skills;
