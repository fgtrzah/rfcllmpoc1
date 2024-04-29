import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./.cert/key.pem'),
      cert: fs.readFileSync('./.cert/cert.pem'),
    },
  },
  resolve: {
    alias: {
      src: path.resolve('src/')
    }
  }
})
