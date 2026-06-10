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
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "commonjs",
  },
  rules: {
    "linebreak-style": "off",
    "quote-props": ["warn", "consistent-as-needed"],
    "quotes": ["warn", "double"],
    "max-len": "off",
    "camelcase": "off",
    "indent": "off",
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
  },
};
