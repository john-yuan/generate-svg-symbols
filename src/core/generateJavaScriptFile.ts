export function generateJavaScriptFile(svg: string, type: 'ts' | 'js') {
  let code: string

  if (type === 'js' || svg.includes('`')) {
    code = JSON.stringify(svg)
  } else {
    code = '`' + svg + '`'
  }

  return 'export default ' + code + '\n'
}
