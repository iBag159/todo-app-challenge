module.exports = {
  verbose: true,
  moduleFileExtensions: ["js", "json", "vue"],

  transform: {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
  },

  collectCoverage: true,
  collectCoverageFrom: ["src/components/*.{js,vue}", "!**/node_modules/**"],
  coverageReporters: ["html", "text-summary"],
  preset: "@vue/cli-plugin-unit-jest",
  setupFiles: ["./tests/setup.js"],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!vuetify)"],
};
