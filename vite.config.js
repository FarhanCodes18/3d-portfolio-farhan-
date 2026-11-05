import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Using relative base ensures assets resolve properly on any deployment (Vercel, Netlify, GitHub Pages, custom domain)
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    target: 'esnext',
    cssCodeSplit: false, // Bundle all CSS into a single rock-solid stylesheet so lazy components never lose styles
    chunkSizeWarningLimit: 1500,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'framer-motion',
      'gsap',
      'lenis',
      'lucide-react',
    ],
  },
})
