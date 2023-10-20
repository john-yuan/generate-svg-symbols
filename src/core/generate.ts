import { generateJavaScriptCode } from './generateJavaScriptCode'
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
}

export function generate(options: GenerateOptions) {
  const { symbols, ids, names } = scanDir(options.dir, {
    idPrefix: options.idPrefix,
    className: options.className,
    keepXmlns: options.keepXmlns,
    keepVersion: options.keepVersion
  })

  let code = [
    options.attrs ? `<svg ${options.attrs}>` : `<svg>`,
    ...symbols,
    '</svg>'
  ].join('\n')

  if (options.wrapper === 'ts' || options.wrapper === 'js') {
    code = generateJavaScriptFile(code, options.wrapper)
  } else if (options.wrapper === 'js-bundle') {
    code = generateJavaScriptCode(code)
  }

  return {
    code,
    ids,
    names
  }
}
