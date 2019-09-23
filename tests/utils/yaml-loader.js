const yamlLoader = require("js-yaml-loader");

module.exports = {
  // process(src, filename, config, options) {
  process(src) {
    return yamlLoader(src);
  },
};
