// vite.config.js
export default {
  server: {
    proxy: {
      '/v1': {
        target: 'https://smshub.openturf.dev/smshub_dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1/, '/v1'),
      },
    },
  },
};
