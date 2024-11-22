import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Usa __dirname para obtener la ruta absoluta
    },
  },
  esbuild: {
    define: {
      __dirname: '"/"',  // Para simular __dirname en un entorno que no lo soporta
    },
  },
});
