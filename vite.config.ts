import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "src/Utils"),
      "@components": path.resolve(__dirname, "src/Components"),
      "@data": path.resolve(__dirname, "src/Data"),
      "@hooks": path.resolve(__dirname, "src/Hooks"),
      "@cms": path.resolve(__dirname, "src/_Contentful"),
    },
  },
});
