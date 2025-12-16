import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  // Next.js defaults
  ...nextVitals,
  ...nextTs,

  // 🔧 Global rule overrides
  {
    rules: {
      // Allow `any` (warn only, CI will NOT fail)
      "@typescript-eslint/no-explicit-any": "warn",

      // Allow unused vars if prefixed with _
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  // 🧱 System boundaries: API & lib
  {
    files: ["src/app/api/**/*", "src/lib/**/*"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // Ignore build artifacts
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
