import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Hooked On Phonetics',
        short_name: 'HookedOnPhonetics',
        description: 'A literacy and speech web application',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
      lines: 95,
      functions: 95,
      branches: 95,
      statements: 95,
    },
  },
  server: {
    port: 3000,
  },
  // GitHub Pages deployment configuration
  base: '/HookedOnPhonetics/',
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Ensure assets are properly referenced with the base path
    assetsDir: 'assets',
  },
});
