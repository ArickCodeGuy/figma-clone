/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { DEFAULT_BACKEND_URL, DEFAULT_PORT } from './constants';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // `.env`, `.env.local`, `.env.[mode]`... and real environment variables, which win.
  // Prefix `''` loads all of them, not only `VITE_*`: these are for this config only,
  // the app itself sees just `VITE_*` (see `.env.example`)
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    server: {
      port: Number(env.PORT) || DEFAULT_PORT,
      proxy: {
        '/api': {
          target: env.BACKEND_URL || DEFAULT_BACKEND_URL,
          changeOrigin: true,
        },
      },
    },
    test: {
      include: ['**/*.vitest.?(ts|js)'],
      globals: true,
    },
  };
});
