import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  { ignores: ["out", ".next", "node_modules", "legacy", ".agent", ".claude"] },
  ...nextVitals,
  ...nextTs,
]);

export default eslintConfig;
