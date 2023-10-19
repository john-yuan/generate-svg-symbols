export function generateJavaScriptFile(symbols: string[], indent?: number) {
  return 'export default ' + JSON.stringify(symbols, null, indent || 2) + '\n'
}
