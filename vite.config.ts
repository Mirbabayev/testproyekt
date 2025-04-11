import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Asılılıqların optimizasiyası
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  
  // Giriş nöqtəsi və qurğu parametrləri
  build: {
    sourcemap: true,
  },
  
  // Alias
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // Server konfiqurasiyası
  server: {
    port: 5173,
    host: true,
  },
});
