/**
 * The file enables `Disciplines` to import all discipline modules in a one-shot
 * manner. There should not be any reason to edit this file.
 */

const files = require.context(".", false, /\.yml$/);
const disciplines = {};

files.keys().forEach(key => {
  if (key.endsWith("__template__.yml")) return;
  const d = files(key);
  disciplines[d.name] = d;
});

export default disciplines;
