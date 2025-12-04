import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill process.env for any legacy libraries that might expect it, 
    // though our code uses import.meta.env
    'process.env': {}
  }
});