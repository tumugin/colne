import { useEffect, useState } from 'react'

export function useDarkTheme() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      setIsDarkTheme(e.matches)
    }
    media.addEventListener('change', onChange)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Initial value must be set from media query
    setIsDarkTheme(media.matches)
    return () => {
      media.removeEventListener('change', onChange)
    }
  }, [])

  return isDarkTheme
}
