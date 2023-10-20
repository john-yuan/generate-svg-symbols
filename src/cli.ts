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
      '  -d --dir        Specify the directory',
      '  -o --output     Specify output filename',
      '  -w --wrapper    Specify output wrapper (svg, ts, js, js-bundle)',
      '  -p --prefix     Specify the prefix of the id',
      '  -c --class      Specify the class name',
      '  -t --types      Generate TypesScript types (can be boolean or string)',
      '  -a --attrs      Specify extra attributes to the svg tag',
      '  -h --help       Print this help message',
      '  --skipSvgo      Skip optimizing svg with svgo',
      '  --skipComments  Skip generating comments for ts or js',
      '  --keepXmlns     Keep xmlns attribute',
      '  --keepVersion   Keep version attribute',
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
    wrapper: readArg('--wrapper', '-w') as GenerateOptions['wrapper'],
    attrs: readArg('--attrs', '-a'),
    skipSvgo: !!args['--skipSvgo'],
    skipComments: !!args['--skipComments'],
    keepXmlns: !!args['--keepXmlns'],
    keepVersion: !!args['--keepVersion']
  }

  if (!options.wrapper && output) {
    if (/\.tsx?$/i.test(output)) {
      options.wrapper = 'ts'
    } else if (/\bbundle\.js$/i.test(output)) {
      options.wrapper = 'js-bundle'
    } else if (/\.jsx?$/i.test(output)) {
      options.wrapper = 'js'
    }
  }

  options.onOptimized = (filename: string) => {
    console.log(`Optimized: ${path.relative(cwd, filename)}`)
  }

  const { svg, ids, names } = generate(options)

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
        writeFileSync(absOutput, svg)
      } else if (options.wrapper === 'ts') {
        writeFileSync(absOutput, [...types, svg].join('\n\n'))
      } else {
        writeFileSync(absOutput, svg)
      }
    } else {
      writeFileSync(absOutput, svg)
    }

    const timeUsed = Date.now() - startedAt

    console.log(`Time used: ${timeUsed}ms`)
  } else {
    console.log(svg)
  }
} else {
  console.error('error: the directory is not specified')
  process.exit(1)
}
