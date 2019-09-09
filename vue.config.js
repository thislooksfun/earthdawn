const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        Disciplines$: path.join(__dirname, "src/assets/earthdawn/disciplines"),
        Races$: path.join(__dirname, "src/assets/earthdawn/races"),
        Skills$: path.join(__dirname, "src/assets/earthdawn/skills"),
        Talents$: path.join(__dirname, "src/assets/earthdawn/talents"),
      },
    },
  },
  chainWebpack: config => {
    config.module
      .rule("yaml")
      .test(/\.ya?ml$/)
      .use("js-yaml-loader")
      .loader("js-yaml-loader")
      .end();
  },
  pluginOptions: {
    electronBuilder: {
      chainWebpackMainProcess: config => {
        config.resolve.alias.set("@", path.join(__dirname, "src/"));
      },
    },
  },
};
