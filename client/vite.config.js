import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.svg', 'mask-icon.svg'],
      manifest: {
        name: 'Hooked On Phonetics',
        short_name: 'HookedOnPhonetics',
        description: 'A literacy and speech web application',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
          {
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: 'images/logo.png',
            sizes: '1024x1024',
            type: 'image/png',
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
  // Deployment configuration
  // Use environment variable to determine base path
  // For Firebase Hosting: '/'
  // For GitHub Pages: '/HookedOnPhonetics/'
  base: process.env.DEPLOY_TARGET === 'github' ? '/HookedOnPhonetics/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsDir: 'assets',
  },
});
