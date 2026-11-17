import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

const at = (p) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": at("./src"),
    },
  },
  build: {
    rollupOptions: {
      // Two pages: the main site (/) and the desktop view (/desktop/)
      input: {
        main: at("./index.html"),
        desktop: at("./desktop/index.html"),
      },
    },
  },
});
