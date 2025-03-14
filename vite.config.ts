import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "./dist",
    emptyOutDir: true,
  },
  server: {
    port: 3000, // Certifique-se de que está na porta correta
    strictPort: true, // Não permita que a porta mude automaticamente
    open: false, // Evita que abra automaticamente
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
