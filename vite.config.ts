import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    // Hot refresh işləməsi üçün
    fastRefresh: true,
  })],
  
  // Asılılıqların optimizasiyası
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      '@tanstack/react-query',
      'lucide-react'
    ],
    exclude: [],
  },
  
  css: {
    // CSS-in işləməsi üçün daha yaxşı log
    devSourcemap: true,
  },
  
  // Giriş nöqtəsi və qurğu parametrləri
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['lucide-react']
        }
      }
    },
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true
      }
    }
  },
  
  // Alias
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // Server
  server: {
    port: 3000, // Yeni port
    strictPort: false, // Port məşğul olduqda artır
    open: true, // Automatically open browser on start
    
    // SPA tətbiqləri üçün bütün marşrutları index.html-ə yönləndirmək üçün
    cors: true,
    hmr: {
      overlay: true,
    },
  },
});
