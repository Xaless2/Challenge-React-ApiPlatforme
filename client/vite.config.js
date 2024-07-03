/* eslint-env node */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: process.env.NODE_ENV === 'production' ? '/Challenge-React-ApiPlatforme/' : '/'
// });
import reactRefresh from '@vitejs/plugin-react-refresh';


// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://planifit-198642ff98b0.herokuapp.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [
    reactRefresh(),
 
  ],
}

