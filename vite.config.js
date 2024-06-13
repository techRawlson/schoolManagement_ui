import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all IP addresses, not just localhost,
    port: 3000 // Change this to the desired port number
  },
  optimizeDeps: {
    include: ['redux', 'react-redux', 'redux-thunk'],
  },
})

