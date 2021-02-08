module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  ecmaFeatures: {
    "arrowFunctions": true,
    "blockBindings": true,
    "classes": true,
    "defaultParams": true,
    "modules": true,
    "spread": true,
    "globalReturn": true,
  },
  rules: {
    'linebreak-style': ["warn", "windows"],
    'quote-props': ["warn", "consistent-as-needed"],
    quotes: ["warn", "double"],
  },
};
