module.exports = {
  extends: "airbnb-typescript-prettier",
  parser: "@typescript-eslint/parser",
  parserOptions: {
      "project": "./tsconfig.json",
      "tsconfigRootDir": __dirname,
      "sourceType": "module"
  },
  rules: {
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "_",
        varsIgnorePattern: "_",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never"
      }
    ],
    "import/prefer-default-export": "off",
    "prefer-destructuring": "off",
    "prefer-template": "off",
  },
};
