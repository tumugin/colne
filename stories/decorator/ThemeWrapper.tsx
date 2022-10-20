import React, { useEffect } from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { applyMode, Mode } from '@cloudscape-design/global-styles'

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const isDarkMode = useDarkMode()

  useEffect(() => {
    applyMode(isDarkMode ? Mode.Dark : Mode.Light)
  }, [isDarkMode])

  return children
}
