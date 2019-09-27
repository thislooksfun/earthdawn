const isTesting = process.env.NODE_ENV === "test";

const presets = ["@vue/app"];
const plugins = isTesting ? ["babel-plugin-require-context-hook"] : [];

module.exports = { presets, plugins };
