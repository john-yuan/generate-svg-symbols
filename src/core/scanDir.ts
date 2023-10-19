import fs from 'fs'
import path from 'path'
import { convertSvgToSymbol } from './convertSvgToSymbol'

export function scanDir(
  dir: string,
  options: {
    idPrefix?: string
    className?: string
    keepXmlns?: boolean
    keepVersion?: boolean
  } = {}
) {
  const symbols: string[] = []

  fs.readdirSync(dir).forEach((name) => {
    const filepath = path.resolve(dir, name)

    if (/\.svg$/i.test(filepath)) {
      try {
        const stat = fs.statSync(filepath)
        if (stat.isFile()) {
          const content = fs.readFileSync(filepath).toString()
          symbols.push(
            convertSvgToSymbol(content, {
              id: (options.idPrefix || '') + name.replace(/\.svg$/i, ''),
              className: options.className,
              keepXmlns: options.keepXmlns,
              keepVersion: options.keepVersion
            })
          )
        }
      } catch (err) {
        console.error(err)
      }
    }
  })

  return symbols
}
