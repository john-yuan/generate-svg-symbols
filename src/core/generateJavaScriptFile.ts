export function generateJavaScriptFile(
  svg: string,
  type: 'ts' | 'js',
  skipComments?: boolean
) {
  let code: string
  let comments = ''

  if (!skipComments) {
    comments = [
      '/* This file was automatically generated and should not be edited. */',
      '/* eslint-disable */',
      '/* tslint:disable */',
      '',
      ''
    ].join('\n')
  }

  if (type === 'js' || svg.includes('`')) {
    code = JSON.stringify(svg)
  } else {
    code = '`' + svg + '`'
  }

  return comments + 'export default ' + code + '\n'
}
