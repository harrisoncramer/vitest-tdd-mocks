import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api/msg": {
        target: "http://localhost:3000/msg",
      },
    },
  },
  resolve: { alias: { vue: 'vue/dist/vue.esm.js' } },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})

