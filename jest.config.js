module.exports = {
  collectCoverageFrom: ["src/**/*.(js|vue)"],
  coverageDirectory: "./coverage",
  coverageReporters: ["lcov", "text-summary"],
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.ya?ml$": "./tests/utils/yaml-loader.js",
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@t/(.*)$": "<rootDir>/tests/$1",
    "^Disciplines$": "<rootDir>/src/assets/earthdawn/disciplines/index.js",
    "^Races$": "<rootDir>/src/assets/earthdawn/races/index.js",
    "^Talents$": "<rootDir>/src/assets/earthdawn/talents/index.js",
    "^Skills$": "<rootDir>/src/assets/earthdawn/skills/index.js",
    "^Spells$": "<rootDir>/src/assets/earthdawn/spells/index.js",
  },
  setupFilesAfterEnv: ["./tests/setup/expect.js"],
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: ["**/tests/(unit|e2e)/**/*.spec.(js|jsx|ts|tsx)"],
  testURL: "http://localhost/",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
