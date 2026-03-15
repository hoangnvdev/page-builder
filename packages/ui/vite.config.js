import { resolve } from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "PageBuilderUI",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      // Only externalize React - bundle everything else
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
        // Bundle CSS to single file
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "style.css";
          }
          return "[name].[ext]";
        },
      },
    },
    cssCodeSplit: false,
    cssMinify: true,
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    minify: "esbuild",
  },
  css: {
    preprocessorOptions: {
      scss: {
        outputStyle: "compressed",
      },
    },
  },
});
