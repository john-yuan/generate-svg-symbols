# README

A command line tool to convert SVG files to symbols.

```bash
npx generate-svg-symbols -d ./path/to/svg/dir -o ./symbols.svg
```

This command will convert every SVG file found in the source directory to SVG symbol and put all the generated symbols into a single SVG file. This command generates SVG file by default, but you can wrap it to different files. The available wrappers are:

- `svg` Output a SVG file.
- `ts` Output a TypeScript file that export the SVG content as its default export.
- `js` Output a JavaScript file that export the SVG content as its default export.
- `js-bundle` Output a JavaScript file that will inject the SVG content to `document.body` automatically.

## Options

```
Usage:
  generate-svg-symbols -d ./path/to/svg/dir

Options:
  -d --dir      Specify the directory
  -o --output   Specify output filename
  -w --wrapper  Specify output wrapper (svg, ts, js, js-bundle)
  -p --prefix   Specify the prefix of the id
  -c --class    Specify the class name
  -t --types    Generate types (can be boolean or string)
  -a --attrs    Specify extra attributes to the svg tag
  --keepXmlns   Keep xmlns attribute
  --keepVersion Keep version attribute
```
