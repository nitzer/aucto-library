import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 3001,
    strictPort: true,
  },
  server: {
    //Added for the sake of testing, not a good practice :)
    allowedHosts: true,
    port: 3001,
    strictPort: true,
    host: true,
    origin: "http://localhost:3001",
    hmr: {
      host: "localhost",
    },
  },
});
