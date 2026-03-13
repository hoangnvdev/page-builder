import { resolve } from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "PageBuilderUI",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      external: (id) => {
        // Only externalize react and react-dom, bundle everything else
        return (
          id === "react" ||
          id === "react-dom" ||
          id.startsWith("react/") ||
          id.startsWith("react-dom/")
        );
      },
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    cssCodeSplit: false,
    outDir: "dist",
    emptyOutDir: true,
  },
});
