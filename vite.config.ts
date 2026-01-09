import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: "window", // global을 window로 치환
  },
});
