import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Configuration for your main application code
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["coverage/**"], // 👈 Add this to ignore the coverage report directory
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node, // 👈 Enable Node.js globals
        ...globals.es2021,
      }
    }
  },
  // Configuration for your test files
  {
    files: ["tests/**/*.{js,mjs,cjs}"], // 👈 Apply this only to files in the tests directory
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest, // 👈 Enable Jest globals (or 'mocha' if you're using Mocha)
      },
      sourceType: "commonjs",
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "warn"
    }
  }
]);