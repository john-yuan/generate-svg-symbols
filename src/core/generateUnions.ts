export function generateUnions(typeName: string, unions: string[]) {
  const code: string[] = [`export type ${typeName} =`]

  unions.forEach((name) => code.push(`  | ${JSON.stringify(name)}`))

  return code.join('\n')
}
