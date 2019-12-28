import { lstatSync, readdirSync } from 'fs'

export default function walk(path: string): string[] {
   return readdirSync(path)
      .map(item => {
         const itemPath = `${path}/${item}`
         return lstatSync(itemPath).isDirectory() ? walk(itemPath) : itemPath
      })
      .flat()
}
