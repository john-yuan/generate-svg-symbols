import fs from 'fs'
import path from 'path'
import { resolveCliArgs } from 'resolve-cli-args'
import { generate } from './core/generate'
import type { GenerateOptions } from './core/generate'
import { generateUnions } from './core/generateUnions'

const { args } = resolveCliArgs(process.argv.slice(2))

if (args['-h'] || args['--help'] || Object.keys(args).length === 0) {
  console.log(
    [
      '',
      'Usage:',
      '  generate-svg-symbols -d ./path/to/svg/dir',
      '',
      'Options:',
      '  -d --dir      Specify the directory',
      '  -o --output   Specify output filename',
      '  -f --format   Specify output format (json, ts, js, js-code)',
      '  -p --prefix   Specify the prefix of the id',
      '  -c --class    Specify the class name',
      '  -t --types    Generate types (can be boolean or string)',
      '  --keepXmlns   Keep xmlns attribute',
      '  --keepVersion Keep version attribute',
      ''
    ].join('\n')
  )

  process.exit(0)
}

const mergeArg = (k1: string, k2?: string) => [
  ...(args[k1] || []),
  ...((k2 ? args[k2] : null) || [])
]

const readArg = (k1: string, k2?: string) => mergeArg(k1, k2)[0]

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

  const { code, ids, names } = generate(options)

  const writeFileSync = (filename: string, content: string) => {
    fs.mkdirSync(path.dirname(filename), { recursive: true, mode: 0o755 })
    fs.writeFileSync(filename, content)

    console.log(`Generated: ${path.relative(cwd, filename)}`)
  }

  if (output) {
    const absOutput = path.resolve(cwd, output)

    if (args['--types'] || args['-t']) {
      const typeFile = mergeArg('--types', '-t')[0]
      const types = [
        generateUnions('SvgSymbolId', ids),
        generateUnions('SvgSymbolName', names)
      ]

      if (typeFile) {
        writeFileSync(path.resolve(cwd, typeFile), types.join('\n\n') + '\n')
        writeFileSync(absOutput, code)
      } else if (options.format === 'ts') {
        writeFileSync(absOutput, [...types, code].join('\n\n'))
      } else {
        writeFileSync(absOutput, code)
      }
    } else {
      writeFileSync(absOutput, code)
    }

    const timeUsed = Date.now() - startedAt

    console.log(`Time used: ${timeUsed}ms`)
  } else {
    console.log(code)
  }
} else {
  console.error('error: the directory is not specified')
  process.exit(1)
}
