'use client'

import { useDarkTheme } from 'libs/dom/useDarkTheme'
import { useEffect } from 'react'
import { applyMode, Mode } from '@cloudscape-design/global-styles'
import { createGlobalStyle } from 'styled-components'

// FIXME: Workaround for cloudscape-design/components bugs for scrolling in small screen
const GlobalStyle = createGlobalStyle`
  body {
    overflow: unset !important;
  }
`

export function GlobalThemeHandler() {
  const isDarkTheme = useDarkTheme()
  useEffect(() => {
    applyMode(isDarkTheme ? Mode.Dark : Mode.Light)
  }, [isDarkTheme])

  return <GlobalStyle />
}
