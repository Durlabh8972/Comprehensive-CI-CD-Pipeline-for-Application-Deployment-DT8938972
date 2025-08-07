// backend/eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Configuration for your main application code
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["coverage/**"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node, 
        ...globals.es2021,
      }
    }
  },
  // Configuration for your test files
  {
    files: ["tests/**/*.{js,mjs,cjs}"], 
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest, 
      },
      // Change 'commonjs' to 'module'
      sourceType: "module",
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "warn"
    }
  }
]);