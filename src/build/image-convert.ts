import fs from 'fs'
import { resolve } from 'path'
import sharp from 'sharp'
import { readAllFiles } from './common'

const WEBP_INPUT_REGEX = /\.(jpe?g|png|gif|tiff|avif)$/i

export function imageWebpPlugin({
  quality = 80,
  lossless = false,
  includePublic = true,
  overwrite = false,
  replaceOriginals = true,
} = {}) {
  let publicDir = 'public'
  let rootDir = process.cwd()
  let outDir = 'dist'

  return {
    name: 'vite:image-webp',
    enforce: 'post',
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
          if (asset.type !== 'asset' || !WEBP_INPUT_REGEX.test(fileName)) {
            return
          }

          const source = Buffer.isBuffer(asset.source)
            ? asset.source
            : Buffer.from(String(asset.source))

          const webpName = `${fileName.replace(/\.[^/.]+$/, '')}.webp`
          if (bundle[webpName] && !overwrite) {
            return
          }

          const webpBuffer = await sharp(source).webp({ quality, lossless }).toBuffer()
          bundle[webpName] = {
            type: 'asset',
            fileName: webpName,
            source: webpBuffer,
          }
          if (replaceOriginals) {
            // remove original asset from bundle so only webp is emitted
            delete bundle[fileName]
          }
        })
      )
    },
    async closeBundle() {
      if (!includePublic) {
        return
      }

      const publicRoot = resolve(rootDir, publicDir)
      const files = readAllFiles(publicRoot).filter((file) => WEBP_INPUT_REGEX.test(file))
      await Promise.all(
        files.map(async (publicFilePath) => {
          const relativePath = publicFilePath.substring(publicRoot.length + 1)
          const outputFilePath = resolve(rootDir, outDir, relativePath)
          if (!fs.existsSync(outputFilePath)) {
            return
          }

          const webpOutputFilePath = outputFilePath.replace(/\.[^/.]+$/, '.webp')
          if (!overwrite && fs.existsSync(webpOutputFilePath)) {
            return
          }

          const source = await fs.promises.readFile(outputFilePath)
          const webpBuffer = await sharp(source).webp({ quality, lossless }).toBuffer()
          await fs.promises.writeFile(webpOutputFilePath, webpBuffer)
          if (replaceOriginals) {
            try {
              await fs.promises.unlink(outputFilePath)
            } catch (err) {
              // ignore unlink errors
            }
          }
        })
      )
    },
  }
}