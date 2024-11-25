/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
    tsconfigRootDir: __dirname,
  },
  globals: {
    React: true,
    JSX: true,
    process: true,
  },
  rules: {
    "no-html-link-for-pages": "off",
  },
}
