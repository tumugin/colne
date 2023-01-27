export function vibrateCompat(duration: number) {
  if (window && window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(duration)
  }
}
