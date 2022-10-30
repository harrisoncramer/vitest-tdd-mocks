import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/api", /* We're using json-server in development */
      },
    },
  },
  resolve: { 
    alias: { 
      /* Quirk of Vue 2.7 */
      vue: 'vue/dist/vue.esm.js',
      '@components': path.resolve(__dirname, 'src/components'),
      '@test': path.resolve(__dirname, 'test'),
      '@mocks': path.resolve(__dirname, '__mocks__'),
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})

