import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// مهم جداً جداً
// يخلي Vercel يقدم index.html للـ SPA routes
export default defineConfig({
  plugins: [react()],

  build: {
    outDir: "dist"
  },

  // أهم خطوة لحل مشكلة Vercel + React Router
  server: {
    fs: {
      allow: ['.']
    }
  },

  // Rewrite داخلي يسمح بفتح الصفحات مباشرة
  // مثل /quote /contact /services بدون 404
  preview: {
    port: 4173,
    strictPort: false
  }
})
