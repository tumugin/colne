export function asSingleStringParam<T>(
  value: string | string[] | undefined,
  defaultValue: T
): string | T {
  if (value === undefined) {
    return defaultValue
  }
  return Array.isArray(value) ? value[0] : value
}

export function asSingleNumberParam<T>(
  value: string | string[] | undefined,
  defaultValue: T
): number | T {
  if (value === undefined) {
    return defaultValue
  }
  return Array.isArray(value) ? parseInt(value[0], 10) : parseInt(value, 10)
}
