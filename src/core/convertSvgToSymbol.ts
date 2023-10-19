export function convertSvgToSymbol(
  svg: string,
  options: {
    id?: string
    className?: string
    keepXmlns?: boolean
    keepVersion?: boolean
  } = {}
) {
  const start = svg.indexOf('<svg')

  return (
    svg
      .substring(start, svg.indexOf('</svg>', start))
      .replace(/<svg([^>]*)>/, (_, first) => {
        const attrs: string[] = []

        if (options.id) {
          attrs.push('id="' + options.id + '"')
        }

        if (options.className) {
          attrs.push('class="' + options.className + '"')
        }

        if (typeof first === 'string') {
          const addMatched = (reg: RegExp) => {
            const matched = first.match(reg)
            if (matched) {
              attrs.push(matched[0])
            }
          }

          addMatched(/viewBox=('|")([^'"]+)\1/i)

          if (options.keepXmlns) {
            addMatched(/xmlns=('|")([^'"]+)\1/i)
          }

          if (options.keepVersion) {
            addMatched(/version=('|")([^'"]+)\1/i)
          }
        }

        return '<symbol ' + attrs.join(' ') + '>'
      }) + '</symbol>'
  )
}
