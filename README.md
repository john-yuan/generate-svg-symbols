# README

Convert SVG files to symbols.

## Usage

```bash
npx generate-svg-symbols -d /path/to/svg/dir -o symbols.json
```

## Options

```
Usage:
  generate-svg-symbols -d ./path/to/svg/dir

Options:
  -d --dir      Specify the directory to scan
  -p --prefix   Specify the id prefix
  -c --class    Specify the class name
  -f --format   Specify output format (json, ts, js, js-code)
  -o --output   Specify output filename
  --keepXmlns   Keep xmlns attribute
  --keepVersion Keep version attribute
```
