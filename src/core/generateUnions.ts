export function generateUnions(typeName: string, unions: string[]) {
  if (!unions.length) {
    return `export type ${typeName} = never`
  }

  const code: string[] = [`export type ${typeName} =`]
  const formatName = (name: string) => {
    return name.includes(`'`) ? JSON.stringify(name) : `'${name}'`
  }

  unions.forEach((name) => code.push(`  | ${formatName(name)}`))

  return code.join('\n')
}
