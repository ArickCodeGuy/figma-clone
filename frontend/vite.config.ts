import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5137';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: BACKEND_URL,
        changeOrigin: true,
      },
    },
  },
});
