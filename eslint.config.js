import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import typescriptParser from "@typescript-eslint/parser";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"] },
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
    languageOptions: { 
      parser: typescriptParser, 
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false
        },
        ecmaFeatures: {
          jsx: true,
					experimentalObjectRestSpread: true,
				},
      },
      ecmaVersion: "latest", 
      globals: globals.browser 
    },
  },
  {
		rules: {
			"no-unused-vars": "off",
			"no-undef": "off",
      'no-empty': 'off',
      "no-redeclare": "off",
      "no-func-assign": "off",
      "no-unreachable": "off",
      "no-control-regex": "off",
      "no-useless-escape": "off",
      "@typescript-eslint/no-explicit-any": "off",
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/unexpected-token': 'off',
      
		},
	},

  //tseslint.configs.recommended,
]);
