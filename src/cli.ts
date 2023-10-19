import fs from 'fs'
import path from 'path'
import { resolveCliArgs } from 'resolve-cli-args'
import type { GenerateOptions } from './core/generate'
import { generate } from './core/generate'

const { args } = resolveCliArgs(process.argv.slice(2))

if (args['-h'] || args['--help'] || Object.keys(args).length === 0) {
  console.log(
    [
      '',
      'Usage:',
      '  generate-svg-symbols -d ./path/to/svg/dir',
      '',
      'Options:',
      '  -d --dir      Specify the directory to scan',
      '  -p --prefix   Specify the id prefix',
      '  -c --class    Specify the class name',
      '  -f --format   Specify output format (json, ts, js, js-code)',
      '  -o --output   Specify output filename',
      '  --keepXmlns   Keep xmlns attribute',
      '  --keepVersion Keep version attribute',
      ''
    ].join('\n')
  )

  process.exit(0)
}

const readArg = (k1: string, k2?: string) => {
  const read = (arr?: string[]) => (arr?.length ? arr[0] : undefined)
  return read(args[k1]) || (k2 ? read(args[k2]) : undefined)
}

const dir = readArg('--dir', '-d')

if (dir) {
  const startedAt = Date.now()
  const cwd = process.cwd()
  const output = readArg('--output', '-o')
  const options: GenerateOptions = {
    dir: path.resolve(cwd, dir),
    idPrefix: readArg('--prefix', '-p'),
    className: readArg('--class', '-c'),
    format: readArg('--format', '-f') as GenerateOptions['format'],
    keepXmlns: !!args['--keepXmlns'],
    keepVersion: !!args['--keepVersion']
  }

  const result = generate(options)

  const ensureDirSync = (dir: string) => {
    fs.mkdirSync(dir, { recursive: true, mode: 0o755 })
  }

  if (output) {
    const absOutput = path.resolve(cwd, output)
    const outDir = path.dirname(absOutput)

    ensureDirSync(outDir)
    fs.writeFileSync(absOutput, result)

    const timeUsed = Date.now() - startedAt

    console.log(`Generated: ${path.relative(cwd, absOutput)} (${timeUsed}ms)`)
  } else {
    console.log(result)
  }
} else {
  console.error('error: the directory is not specified')
  process.exit(1)
}
