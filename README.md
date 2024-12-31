# README

[![npm version](https://img.shields.io/npm/v/generate-svg-symbols.svg)](https://www.npmjs.com/package/generate-svg-symbols)

A command line tool to convert SVG files to symbols.

```bash
npx generate-svg-symbols -d ./path/to/svg/dir -o ./symbols.svg
```

This command will convert every SVG file found in the source directory to SVG symbol and put all the generated symbols into a single SVG file. This command generates SVG file by default, but you can wrap it to different files. The available wrappers are:

- `svg` Output a SVG file.
- `ts` Output a TypeScript file that export the SVG content as its default export.
- `js` Output a JavaScript file that export the SVG content as its default export.
- `js-bundle` Output a JavaScript file that will inject the SVG content to `document.body` automatically.

If you want to optimize the SVG content (remove redundant and useless information in the SVG content), you can install [svgo][svgo] to your project. If [svgo][svgo] is detected, the SVG content will be optimized with [svgo][svgo] before it get converted to SVG symbol automatically (to avoid this, you can use the `--skipSvgo` option).

[svgo]: https://www.npmjs.com/package/svgo

## Options

```text
Usage:
  generate-svg-symbols -d ./path/to/svg/dir

Options:
  -d --dir        Specify the directory
  -o --output     Specify output filename
  -w --wrapper    Specify output wrapper (svg, ts, js, js-bundle)
  -p --prefix     Specify the prefix of the id
  -c --class      Specify the class name
  -t --types      Generate TypesScript types (can be boolean or string)
  -n --varname    Specify the export const variable name for ts or js
  -a --attrs      Specify extra attributes to the svg tag
  -h --help       Print this help message
  --skipSvgo      Skip optimizing svg with svgo
  --skipComments  Skip generating comments for ts or js
  --keepXmlns     Keep xmlns attribute
  --keepVersion   Keep version attribute
```

## API usage

You can also use the API to generate SVG symbols. For example:

```ts
import { generate } from 'generate-svg-symbols'

const { ids, names, symbols, svg } = generate({ dir: './svg' })

console.log(ids)
console.log(names)
console.log(symbols)
console.log(svg)
```

## License

[MIT](./LICENSE)
