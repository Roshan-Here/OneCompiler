import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { loadEnv } from 'vite';

const env = loadEnv('development', process.cwd());

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: env.VITE_FRONTEND_URL,
    port: env.VITE_FRONTEND_PORT,
    proxy: {
      "/api": {
        target: env.VITE_BACKEND_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    proxy: {
      "/api": {
        target: env.VITE_BACKEND_URL, 
        changeOrigin: true,
        secure: false,
       
      }
    }
  },
  
  assetsInclude: ['**/*.PNG']
})
