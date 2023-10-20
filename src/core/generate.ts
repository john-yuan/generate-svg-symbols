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
  attrs?: string
  skipSvgo?: boolean
  skipComments?: boolean
  onOptimized?: (filename: string) => void
}

export function generate(options: GenerateOptions) {
  const { symbols, ids, names } = scanDir(options.dir, {
    idPrefix: options.idPrefix,
    className: options.className,
    keepXmlns: options.keepXmlns,
    keepVersion: options.keepVersion,
    skipSvgo: options.skipSvgo,
    onOptimized: options.onOptimized
  })

  let svg = [
    options.attrs ? `<svg ${options.attrs}>` : `<svg>`,
    ...symbols,
    '</svg>'
  ].join('\n')

  if (options.wrapper === 'ts' || options.wrapper === 'js') {
    svg = generateJavaScriptFile(svg, options.wrapper, options.skipComments)
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
