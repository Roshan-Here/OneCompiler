import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { loadEnv } from 'vite';

const env = loadEnv('development', process.cwd());

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // windows
    host: env.VITE_FRONTEND_URL,
    // linux
    // host: '192.168.1.1',
    port: env.VITE_FRONTEND_PORT,
    // default
    // host : '127.0.0.1',
    // port : 8000
    proxy: {
      '/api': {
        target: env.VITE_BACKEND_URL,
        secure: false,
      }
    }
  },
  assetsInclude: ['**/*.PNG']
})
