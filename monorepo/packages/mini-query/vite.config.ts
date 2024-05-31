import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.js"),
      name: "mini-query",
      fileName: (format) => `mini-query.${format}.js`,
    },
  },
});
