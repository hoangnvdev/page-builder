import { resolve } from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "PageBuilderTemplates",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      // Don't bundle these - they're peer dependencies
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
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
    cssMinify: true,
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    minify: "esbuild",
  },
});
