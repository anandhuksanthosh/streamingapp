import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to the backend server
      "/api": {
        target: "http://localhost:3000", // Replace with your backend URL
        changeOrigin: true, // Change the origin of the request to the target
        secure: false, // Set to true if using HTTPS
        rewrite: (path) => path, // Keep '/api' prefix
      },
    },
  },
});
