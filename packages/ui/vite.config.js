import { resolve } from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
      babel: {
        compact: false,
      },
    }),
  ],
  build: {
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "PageBuilderUI",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      external: (id) => {
        return (
          id === "react" ||
          id === "react-dom" ||
          id === "react/jsx-runtime" ||
          id.startsWith("react/") ||
          id.startsWith("react-dom/")
        );
      },
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "style.css";
          }
          return "[name].[ext]";
        },
      },
      treeshake: {
        moduleSideEffects: (id) => {
          // Preserve side effects for CSS/SCSS imports
          return id.endsWith(".css") || id.endsWith(".scss");
        },
        propertyReadSideEffects: false,
      },
    },
    cssCodeSplit: false,
    cssMinify: true,
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    minify: "esbuild",
    reportCompressedSize: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        outputStyle: "compressed",
      },
    },
  },
});
