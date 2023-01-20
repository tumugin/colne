export function asSingleStringParam<T>(
  value: string | string[] | undefined,
  defaultValue: T,
  denyEmpty: boolean = false
): string | T {
  if (value === undefined) {
    return defaultValue
  }
  const evaluatedValue = Array.isArray(value) ? value[0] : value
  if (denyEmpty) {
    return evaluatedValue === '' ? defaultValue : evaluatedValue
  }
  return evaluatedValue
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
