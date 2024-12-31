export function generateJavaScriptFile(
  svg: string,
  type: 'ts' | 'js',
  varname?: string
) {
  let code: string

  if (type === 'js' || svg.includes('`')) {
    code = JSON.stringify(svg)
  } else {
    code = '`' + svg + '`'
  }

  if (varname) {
    return 'export const ' + varname + ' = ' + code + '\n'
  }

  return 'export default ' + code + '\n'
}
