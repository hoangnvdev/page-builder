import path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@helpers": path.resolve(__dirname, "helpers"),
    },
    dedupe: ["react", "react-dom"],
  },

  server: {
    port: 3000,
    open: true,
  },

  build: {
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": [
            "react",
            "react-dom",
            "react-redux",
            "react-router-dom",
          ],
          "redux-vendor": ["@reduxjs/toolkit"],
          "form-vendor": ["formik"],
          "icons-vendor": ["lucide-react"],
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] || assetInfo.name;
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/i.test(name)) {
            return "assets/images/[name]-[hash][extname]";
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/i.test(name)) {
            return "assets/fonts/[name]-[hash][extname]";
          }
          if (/\.css$/i.test(name)) {
            return "assets/css/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
  },

  preview: {
    port: 4173,
    open: true,
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-redux",
      "@reduxjs/toolkit",
      "formik",
      "lucide-react",
      "react-router-dom",
    ],
    exclude: ["@page-builder/ui", "@page-builder/templates"],
  },
});
