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
  format?: 'json' | 'ts' | 'js' | 'js-code'
}

export function generate(options: GenerateOptions) {
  const { symbols, ids, names } = scanDir(options.dir, {
    idPrefix: options.idPrefix,
    className: options.className,
    keepXmlns: options.keepXmlns,
    keepVersion: options.keepVersion
  })

  let code = ''

  if (options.format === 'ts' || options.format === 'js') {
    code = generateJavaScriptFile(symbols, options.indent)
  } else if (options.format === 'js-code') {
    code = generateJavaScriptCode(symbols)
  } else {
    code = JSON.stringify(symbols, null, options.indent || 2)
  }

  return {
    code,
    ids,
    names
  }
}
