import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React ecosystem
          "react-vendor": [
            "react",
            "react-dom",
            "react-redux",
            "react-router-dom",
          ],
          // Redux toolkit in separate chunk
          "redux-vendor": ["@reduxjs/toolkit"],
          // Form libraries
          "form-vendor": ["formik"],
          // Icons
          "icons-vendor": ["lucide-react"],
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          let extType = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            extType = "images";
          } else if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name)) {
            extType = "fonts";
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
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
    ],
  },
});
