# README

Convert SVG files to symbols.

## Usage

```bash
npx generate-svg-symbols -d ./path/to/svg/dir -o ./symbols.json
```

## Options

```
Usage:
  generate-svg-symbols -d ./path/to/svg/dir

Options:
  -d --dir      Specify the directory
  -o --output   Specify output filename
  -f --format   Specify output format (json, ts, js, js-code)
  -p --prefix   Specify the prefix of the id
  -c --class    Specify the class name
  -t --types    Generate types (can be boolean or string)
  --keepXmlns   Keep xmlns attribute
  --keepVersion Keep version attribute
```
