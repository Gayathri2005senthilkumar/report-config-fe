// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy for /v1 endpoints
      '/v1': {
        target: 'https://smshub.openturf.dev/smshub_dev',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
