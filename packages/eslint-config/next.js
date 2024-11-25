const baseRules = require("./base")
const reactRules = require("./reactRules")

/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["next", "turbo", "./library.js"],
  plugins: ["react", "react-hooks"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
      experimentalObjectRestSpread: true,
    },
  },
  globals: {
    React: true,
    JSX: true,
    TailwindColor: true,
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: Object.assign(baseRules, reactRules),
}
