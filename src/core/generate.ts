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
  const symbols = scanDir(options.dir, {
    idPrefix: options.idPrefix,
    className: options.className,
    keepXmlns: options.keepXmlns,
    keepVersion: options.keepVersion
  })

  if (options.format === 'ts' || options.format === 'js') {
    return generateJavaScriptFile(symbols, options.indent)
  }

  if (options.format === 'js-code') {
    return generateJavaScriptCode(symbols)
  }

  return JSON.stringify(symbols, null, options.indent || 2)
}
