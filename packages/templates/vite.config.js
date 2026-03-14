import { resolve } from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "PageBuilderTemplates",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "prop-types",
        "uuid",
        "@page-builder/ui",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "prop-types": "PropTypes",
          uuid: "uuid",
        },
      },
    },
    cssCodeSplit: false,
    outDir: "dist",
    emptyOutDir: true,
  },
});
