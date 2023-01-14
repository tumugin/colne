export function dummyPromise() {
  return new Promise<void>((resolve, reject) => {
    resolve()
  })
}
