import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Proxy API requests to Flask server
    }, 
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Define '@' alias for 'src' directory
    },
  },
  base: './', // Optional: Set the base path
});
