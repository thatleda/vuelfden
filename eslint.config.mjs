// @ts-ignore
import perfectionist from "eslint-plugin-perfectionist";
import perfectionistNatural from "eslint-plugin-perfectionist/configs/recommended-natural";
import prettier from "eslint-plugin-prettier/recommended";

import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
  {
    rules: {
      "vue/no-multiple-template-root": "off",
    },
  },
  prettier,
  perfectionistNatural,
  {
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-imports": ["warn"],
      "perfectionist/sort-vue-attributes": ["off"],
    },
  },
]);
