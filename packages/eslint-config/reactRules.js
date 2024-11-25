const reactRules = {
  // Disabled because we know better
  "react/boolean-prop-naming": 0,

  // Warn because we shouldn't be lazy but we might know better
  "react/button-has-type": "warn",

  // Disabled because we know better
  "react/default-props-match-prop-types": 0,

  // Disabled because this rule is incredibly annoying and we absolutely know better
  "react/destructuring-assignment": 0,

  // Disabled because we know better
  "react/display-name": 0,

  // Disabled because we know better
  "react/forbid-component-props": 0,

  // Disabled because we know better
  "react/forbid-dom-props": 0,

  // Disabled because we know better
  "react/forbid-elements": 0,

  // Disabled because we know better
  "react/forbid-foreign-prop-types": 0,

  // Disabled because we know better
  "react/forbid-prop-types": 0,

  // Disabled because we know better
  "react/function-component-definition": 0,

  // Disabled because we know better
  "react/hook-use-state": 0,

  // Warn because you should be using a setter function but you might know better
  "react/no-access-state-in-setstate": "warn",

  // Disabled because we know better
  "react/no-adjacent-inline-elements": 0,

  // Warn because there's a momentary benefit to doing this but you shouldn't be lazy
  "react/no-array-index-key": "warn",

  // Error because this is fixable and helps differentiate component methods
  "react/no-arrow-function-lifecycle": "error",

  // Disabled because we know better
  "react/no-children-prop": 0,

  // Disabled because we absolutely know better
  "react/no-danger": 0,

  // Warn because you probably know better if you're doing this but do explain
  "react/no-danger-with-children": "warn",

  // Error because it's 2022
  "react/no-deprecated": "error",

  // Disabled because we know better
  "react/no-did-mount-set-state": 0,

  // Warn because this is sometimes useful but can also be dangerous
  "react/no-did-update-set-state": "warn",

  // Error because this is most likely an error
  "react/no-direct-mutation-state": "error",

  // Disabled because we know better
  "react/no-find-dom-node": 0,

  // Warn because sometimes we know better
  "react/no-invalid-html-attribute": "warn",

  // Disabled because we know better
  "react/no-is-mounted": 0,

  // Disabled because there isn't enough time in a day
  "react/no-multi-comp": 0,

  // Error because this won't build
  "react/no-namespace": "error",

  // Disabled because we know better
  "react/no-redundant-should-component-update": 0,

  // Disabled because we know better
  "react/no-render-return-value": 0,

  // Disabled because what, why?
  "react/no-set-state": 0,

  // Warn because this is deprecated but you might have your reasons
  "react/no-string-refs": "warn",

  // Warn because this is often an artifact of refactoring, but you might also know better
  "react/no-this-in-sfc": "warn",

  // Disabled because we know better and I don't trust this rule to be effective
  "react/no-typos": 0,

  // Disabled because this will be caught by build, otherwise we know better
  "react/no-unescaped-entities": 0,

  // Disabled because we know better
  "react/no-unsafe": 0,

  // Warn because there are legitimate usecases for this but generally we shouldn't do this
  "react/no-unstable-nested-components": "warn",

  // Warn because it's good to keep track of, but sometimes we like to debug our code in peace
  "react/no-unused-class-component-methods": "warn",

  // Warn because it's good to keep track of, but sometimes we like to debug our code in peace
  "react/no-unused-prop-types": "warn",

  // Warn because it's good to keep track of, but sometimes we like to debug our code in peace
  "react/no-unused-state": "warn",

  // Warn because this is sometimes useful but can also be dangerous
  "react/no-will-update-set-state": "warn",

  // Disabled because we know better
  "react/prefer-es6-class": 0,

  // Disabled because we know better
  "react/prefer-exact-props": 0,

  // Disabled because we know better
  "react/prefer-read-only-props": 0,

  // Disabled because we know better
  "react/prefer-stateless-function": 0,

  // Disabled because we know better
  "react/prop-types": 0,

  // Disabled because Next.js is awesome
  "react/react-in-jsx-scope": 0,

  // Disabled because we know better
  "react/require-default-props": 0,

  // Disabled because we know better
  "react/require-optimization": 0,

  // Error because this is always an error
  "react/require-render-return": "error",

  // Error because it's fixable and consistency matters
  "react/self-closing-comp": "error",

  // Disabled because there really really isn't enough time in a day
  "react/sort-comp": 0,

  // Disabled because there really really isn't enough time in a day
  "react/sort-prop-types": 0,

  // Disabled because we know better
  "react/state-in-constructor": 0,

  // Disabled because there really really isn't enough time in a day
  "react/static-property-placement": 0,

  // Error because this is always an error
  "react/style-prop-object": "error",

  // Error because this is always an error
  "react/void-dom-elements-no-children": "error",

  // Error because it's fixable and consistent
  "react/jsx-boolean-value": "error",

  // Disabled because Prettier takes care of this
  "react/jsx-child-element-spacing": 0,

  // Disabled because Prettier takes care of this
  "react/jsx-closing-bracket-location": 0,

  // Disabled because Prettier takes care of this
  "react/jsx-closing-tag-location": 0,

  // Disabled because Prettier takes care of this
  "react/jsx-curly-brace-presence": 0,

  // Disabled because Prettier takes care of this
  "react/jsx-curly-newline": 0,

  // Disabled because Prettier takes care of this
  "react/jsx-curly-spacing": 0,

  // Disabled because Prettier takes care of this
  "react/jsx-equals-spacing": 0,

  // Disabled because we know better
  "react/jsx-filename-extension": 0,

  // Error because consistency matters
  "react/jsx-first-prop-new-line": ["error", "multiline"],

  // Error because consistency matters
  "react/jsx-fragments": ["error", "syntax"],

  // Disabled because we know better
  "react/jsx-handler-names": 0,

  // Disabled because Prettier takes care of this
  "react/jsx-indent": 0,

  // Disabled because Prettier takes care of this
  "react/jsx-indent-props": 0,

  // Warn because this is probably an error but you might know better
  "react/jsx-key": "warn",

  // Disabled for the same reason complexity rule is disabled
  "react/jsx-max-depth": 0,

  // Disabled for the same reason complexity rule is disabled
  "react/jsx-max-props-per-line": 0,

  // Disabled because we know better
  "react/jsx-newline": 0,

  // Disabled because after test driving it for a while we've come to know better
  "react/jsx-no-bind": 0,

  // Disabled because we know better
  "react/jsx-no-comment-textnodes": 0,

  // Disabled because we know better
  "react/jsx-no-constructed-context-values": 0,

  // Error because this is always an error
  "react/jsx-no-duplicate-props": "error",

  // Disabled because we know better
  "react/jsx-no-literals": 0,

  // Warn because why would you do this? If you are, you probably know better
  "react/jsx-no-script-url": "warn",

  // Warn because this is a good practice, but error is too much
  "react/jsx-no-target-blank": "warn",

  // Error because this is always an error
  "react/jsx-no-undef": "error",

  // Warn to make code simpler. Allowing expressions for cases like `<>{children}</>`
  "react/jsx-no-useless-fragment": ["warn", { allowExpressions: true }],

  // Disabled because we know better
  "react/jsx-one-expression-per-line": 0,

  // Disabled because we know better
  "react/jsx-pascal-case": 0,

  // Disabled because Prettier takes care of this
  "react/jsx-props-no-multi-spaces": 0,

  // Disabled because we know better
  "react/jsx-props-no-spreading": 0,

  // Disabled because there isn't enough time in a day
  "react/jsx-sort-default-props": 0,

  // Disabled because there really really isn't enough time in a day
  "react/jsx-sort-props": 0,

  // Disabled because Prettier takes care of this
  "react/jsx-space-before-closing": 0,

  // Disabled because Prettier takes care of this
  "react/jsx-tag-spacing": 0,

  // Disabled because Next.js is awesome
  "react/jsx-uses-react": 0,

  // Warn because it's useful to keep track of but sometimes we like to debug our code in peace
  "react/jsx-uses-vars": "warn",

  // Disabled because Prettier takes care of this
  "react/jsx-wrap-multilines": 0,

  // Disabled because we know better than to incur hundreds of dollars of bandwidth fees
  "@next/next/no-img-element": 0,

  "no-html-link-for-pages": 0,

  "react-hooks/exhaustive-deps": "error",
}

module.exports = reactRules
