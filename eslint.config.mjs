import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    ignores: [
      "**/.pnpm-store/**",
      "**/.turbo/**",
      "**/build/**",
      "**/coverage/**",
      "**/dist/**",
      "**/generated/**",
      "**/node_modules/**",
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-extraneous-class": ["error", { allowWithDecorator: true }],
      "@typescript-eslint/no-import-type-side-effects": "error",
    },
  },
);
