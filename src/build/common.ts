import fs from 'fs'
import { join } from 'path'

export function readAllFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name)
    return entry.isDirectory() ? readAllFiles(fullPath) : [fullPath]
  })
}