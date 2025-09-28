module.exports = {
  env: { browser: true, es2021: true, node: true },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint"],
  settings: { react: { version: "detect" } },
  rules: {}
};
