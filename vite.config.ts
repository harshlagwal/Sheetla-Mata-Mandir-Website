import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'motion': ['framer-motion'],
          'pdf': ['jspdf', 'html2canvas'],
          'email': ['@emailjs/browser'],
          'qr': ['qrcode.react'],
          'vendor': ['lucide-react'] // anything else will be in default vendor chunk
        }
      }
    }
  }
});
