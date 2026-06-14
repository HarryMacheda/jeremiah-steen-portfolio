import fs from 'fs'
import {resolve } from 'path'
import sharp from 'sharp'
import { readAllFiles } from './common'

const IMAGE_REGEX = /\.(jpe?g|png|gif|tiff|webp|avif)$/i

// Uses the sharp library to resize images in the bundle.

export function imageResizePlugin({
  maxWidth = 2000,
  maxHeight = 2000,
  includePublic = true,
} = {}) {
  let publicDir = 'public'
  let rootDir = process.cwd()
  let outDir = 'dist'

  return {
    name: 'vite:image-resize',
    enforce: 'pre',
    apply: 'build',
    configResolved(config: any) {
      rootDir = config.root
      outDir = config.build.outDir ?? outDir
      if (typeof config.publicDir === 'string') {
        publicDir = config.publicDir
      }
    },
    async generateBundle(_options: any, bundle: Record<string, any>) {
      await Promise.all(
        Object.entries(bundle).map(async ([fileName, asset]) => {
          if (asset.type !== 'asset' || !IMAGE_REGEX.test(fileName)) {
            return
          }

          const source = Buffer.isBuffer(asset.source)
            ? asset.source
            : Buffer.from(String(asset.source))

          const metadata = await sharp(source).metadata()
          if (!metadata.width || !metadata.height) {
            return
          }

          if (metadata.width <= maxWidth && metadata.height <= maxHeight) {
            return
          }

          asset.source = await sharp(source)
            .resize({
              width: maxWidth,
              height: maxHeight,
              fit: 'inside',
              withoutEnlargement: true,
            })
            .toBuffer()
        })
      )
    },
    async closeBundle() {
      if (!includePublic) {
        return
      }

      const publicRoot = resolve(rootDir, publicDir)
      const files = readAllFiles(publicRoot).filter((file) => IMAGE_REGEX.test(file))
      await Promise.all(
        files.map(async (publicFilePath) => {
          const relativePath = publicFilePath.substring(publicRoot.length + 1)
          const outputFilePath = resolve(rootDir, outDir, relativePath)
          if (!fs.existsSync(outputFilePath)) {
            return
          }

          const source = await fs.promises.readFile(outputFilePath)
          const metadata = await sharp(source).metadata()
          if (!metadata.width || !metadata.height) {
            return
          }

          if (metadata.width <= maxWidth && metadata.height <= maxHeight) {
            return
          }

          const resized = await sharp(source)
            .resize({
              width: maxWidth,
              height: maxHeight,
              fit: 'inside',
              withoutEnlargement: true,
            })
            .toBuffer()

          await fs.promises.writeFile(outputFilePath, resized)
        })
      )
    },
  }
}
