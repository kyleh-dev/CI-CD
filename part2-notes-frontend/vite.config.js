import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js',
    exclude: [
      '**/e2e/**',
      'note_app.spec.js',
      'example.spec.js',
      '**/components/**',
      './node_modules/**'
    ]
  }
})
