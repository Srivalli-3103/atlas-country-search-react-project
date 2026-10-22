import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // The browser calls /countries-api/... on our own dev server (same origin, so no CORS),
      // and Vite forwards it to the countries API on our behalf.
      '/countries-api': {
        target: 'https://countries.dev',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/countries-api/, ''),
      },
    },
  },
});
