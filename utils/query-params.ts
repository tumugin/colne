export function asSingleStringParam(value: string | string[]): string {
  return Array.isArray(value) ? value[0] : value
}

export function asSingleNumberParam(value: string | string[]): number {
  return Array.isArray(value) ? parseInt(value[0], 10) : parseInt(value, 10)
}
