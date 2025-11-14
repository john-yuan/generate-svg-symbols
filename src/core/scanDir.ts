import fs from 'fs'
import path from 'path'
import { convertSvgToSymbol } from './convertSvgToSymbol'
import { optimize } from './optimize'

export function scanDir(
  dir: string,
  options: {
    idPrefix?: string
    className?: string
    keepXmlns?: boolean
    keepVersion?: boolean
    skipSvgo?: boolean
    onOptimized?: (filename: string) => void
  } = {},
  onError?: (err: any) => void
) {
  const ids: string[] = []
  const names: string[] = []
  const symbols: string[] = []

  try {
    fs.readdirSync(dir).forEach((name) => {
      const filepath = path.resolve(dir, name)

      if (/\.svg$/i.test(filepath)) {
        try {
          const stat = fs.statSync(filepath)
          if (stat.isFile()) {
            let content = fs.readFileSync(filepath).toString()

            if (!options.skipSvgo) {
              const result = optimize(content, options.idPrefix || '__symbol')
              if (result.optimized) {
                content = result.svg
                options.onOptimized?.(filepath)
              }
            }

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
  } catch (err) {
    onError?.(err)
  }
  return { ids, names, symbols }
}
