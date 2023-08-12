export function never(_x: never): never {
  throw new Error(`Never value has passed: ${_x}`)
}
