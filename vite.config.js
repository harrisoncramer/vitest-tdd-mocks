import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/api", /* We're using json-server in development */
      },
    },
  },
  /* Quirk of Vue 2.7 */
  resolve: { alias: { vue: 'vue/dist/vue.esm.js' } },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})

