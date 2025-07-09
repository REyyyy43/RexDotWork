import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      'rexdotwork.onrender.com'
    ],
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})

