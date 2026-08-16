import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This is the root personal site: https://<username>.github.io/
  base: '/',
})
