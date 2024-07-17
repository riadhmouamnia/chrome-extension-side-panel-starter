import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: "./src/main.tsx",
        background: "./src/background.ts",
        index: "./index.html",
      },
      output: {
        entryFileNames: "assets/[name].bundle.js",
        chunkFileNames: "assets/[name].bundle.js",
        assetFileNames: "assets/[name].bundle.[ext]",
        // put html to dist folder
        manualChunks(id) {
          if (id.includes("index.html")) {
            return "index";
          }
        },
      },
    },
    outDir: "dist",
  },
});
