import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import relay from "vite-plugin-relay"
import svgx from "@svgx/vite-plugin-react";

 
export default defineConfig({
  // @ts-expect-error - Plugin error, it is responsible fon importing and rendering svg files
  plugins: [  react(), relay, svgx(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})