/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },  /* The following is added, so that error from eslint to ask delete cr will disappear */
  "prettier/prettier": [
    "error",
    {
      "endOfLine": "auto",
    },
  ],
};
