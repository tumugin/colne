import { useDarkTheme } from 'libs/dom/useDarkTheme'
import { useEffect } from 'react'
import { applyMode, Mode } from '@cloudscape-design/global-styles'

export function GlobalThemeHandler() {
  const isDarkTheme = useDarkTheme()
  useEffect(() => {
    applyMode(isDarkTheme ? Mode.Dark : Mode.Light)
  }, [isDarkTheme])

  return null
}
