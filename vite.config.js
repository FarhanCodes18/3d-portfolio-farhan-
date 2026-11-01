import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    target: 'esnext',
    // Vite 8 uses oxc minifier by default — no explicit minify needed
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching — function syntax required by Rolldown
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
            if (id.includes('three') || id.includes('@react-three')) return 'three-vendor';
            if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) return 'animation-vendor';
            if (id.includes('lucide-react')) return 'ui-vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  // Optimize deps pre-bundling
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
    ],
  },
})
