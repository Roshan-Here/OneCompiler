import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    assetsInclude: ['**/*.PNG'],
  });
};

// server: {
//   proxy: {
//     '/api': {
//       target: env.VITE_BACKEND_URL,
//       changeOrigin: true,
//       secure: false,
//     },
//   },
// },