
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { analyzer } from 'vite-bundle-analyzer'
import { imageResizePlugin } from './src/build/image-resize'
import { imageWebpPlugin } from './src/build/image-convert'

const MAX_IMAGE_WIDTH = 1600
const MAX_IMAGE_HEIGHT = 1600

// https://vite.dev/config/
export default defineConfig({
  base: '/jerry-portfolio/',
  plugins: [
    imageResizePlugin({
      maxWidth: MAX_IMAGE_WIDTH,
      maxHeight: MAX_IMAGE_HEIGHT,
      includePublic: true,
    }),
    imageWebpPlugin({
      quality: 80,
      lossless: false,
      includePublic: true,
      overwrite: false,
      replaceOriginals: true,
    }),
    react(),
    ViteImageOptimizer({
      includePublic: true,
      png: { quality: 90 },
      jpeg: { quality: 90 },
      jpg: { quality: 90 },
      webp: { lossless: false, quality: 80 },
      avif: { lossless: false, quality: 55 },
      cache: true,
      cacheLocation: 'node_modules/.cache/image-optimizer',
    }),
    analyzer(),
  ],
})
