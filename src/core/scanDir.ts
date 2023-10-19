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
  const ids: string[] = []
  const names: string[] = []
  const symbols: string[] = []

  fs.readdirSync(dir).forEach((name) => {
    const filepath = path.resolve(dir, name)

    if (/\.svg$/i.test(filepath)) {
      try {
        const stat = fs.statSync(filepath)
        if (stat.isFile()) {
          const content = fs.readFileSync(filepath).toString()
          const symbolName = name.replace(/\.svg$/i, '')
          const symbolId = (options.idPrefix || '') + symbolName

          ids.push(symbolId)
          names.push(symbolName)

          symbols.push(
            convertSvgToSymbol(content, {
              id: symbolId,
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

  return { ids, names, symbols }
}
