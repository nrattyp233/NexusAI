import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // Fix: Cast process to any to resolve TS error 'Property cwd does not exist on type Process'
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Explicitly define process.env.API_KEY so the service layer can read it
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Polyfill the rest of process.env to prevent crashes
      'process.env': {}
    }
  };
});