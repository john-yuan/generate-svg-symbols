import { generateJavaScriptBundle } from './generateJavaScriptBundle'
import { generateJavaScriptFile } from './generateJavaScriptFile'
import { scanDir } from './scanDir'

export interface GenerateOptions {
  dir: string
  indent?: number
  idPrefix?: string
  className?: string
  keepXmlns?: boolean
  keepVersion?: boolean
  wrapper?: 'svg' | 'ts' | 'js' | 'js-bundle'
  varname?: string
  attrs?: string
  skipSvgo?: boolean
  onOptimized?: (filename: string) => void
}

export function generate(options: GenerateOptions) {
  const { symbols, ids, names } = scanDir(
    options.dir,
    {
      idPrefix: options.idPrefix,
      className: options.className,
      keepXmlns: options.keepXmlns,
      keepVersion: options.keepVersion,
      skipSvgo: options.skipSvgo,
      onOptimized: options.onOptimized
    },
    (err) => {
      console.log(`${err}`)
      console.log('')
    }
  )

  let svg = [
    options.attrs ? `<svg ${options.attrs}>` : `<svg>`,
    ...symbols,
    '</svg>'
  ].join(symbols.length ? '\n' : '')

  if (options.wrapper === 'ts' || options.wrapper === 'js') {
    svg = generateJavaScriptFile(svg, options.wrapper, options.varname)
  } else if (options.wrapper === 'js-bundle') {
    svg = generateJavaScriptBundle(svg)
  }

  return {
    svg,
    ids,
    names,
    symbols
  }
}
