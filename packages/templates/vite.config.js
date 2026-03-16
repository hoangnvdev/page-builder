import { resolve } from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

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
      name: "PageBuilderTemplates",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "i18next",
        "react-i18next",
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
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "templates.css";
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
});
