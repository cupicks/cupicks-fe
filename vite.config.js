import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: false,
      include: "**/*.svg",
    }),
  ],
  server: {
    port: 3067,
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});
