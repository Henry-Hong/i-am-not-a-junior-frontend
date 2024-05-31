import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "mini-query",
      fileName: (format) => `mini-query.${format}.js`,
    },
  },
});
