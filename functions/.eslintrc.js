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
  rules: {
    'linebreak-style': ["warn", "windows"],
    'quote-props': ["warn", "consistent-as-needed"],
    quotes: ["warn", "double"],
  },
};
