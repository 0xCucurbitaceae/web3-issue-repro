const { resolve } = require("node:path");
const baseRules = require("./base")

const project = resolve(process.cwd(), "tsconfig.json")

/** @type {import("eslint").Linter.Config} */
module.exports = {
  // eslint-disable-next-line quote-props
  extends: ["eslint:recommended", "prettier", "turbo", "eslint-config-turbo"],
  plugins: ["@typescript-eslint", "prettier"],
  globals: {
    BigInt: true,
  },
  env: {
    node: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
  ],
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"],
    },
  ],
  rules: baseRules,
}
