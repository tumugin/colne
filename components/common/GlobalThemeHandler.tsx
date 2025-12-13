'use client'

import { useDarkTheme } from 'libs/dom/useDarkTheme'
import { useEffect, useState } from 'react'
import { applyMode, Mode } from '@cloudscape-design/global-styles'
import { createGlobalStyle } from 'styled-components'

const styled = { createGlobalStyle }

const GlobalStyle = styled.createGlobalStyle<{ appHasHydrated: boolean }>`
  body {
    @media (prefers-color-scheme: dark) {
      background-color: #0f1b2a;
    }
  }

  main {
    @media (prefers-color-scheme: dark) {
      // FIXME: UIがちらつくので、読み込み中には非表示にして見えないようにする
      opacity: ${(v) => (v.appHasHydrated ? 'unset !important' : '0')};
    }
  }
`

export function GlobalThemeHandler() {
  const isDarkTheme = useDarkTheme()
  const [appHasHydrated, setAppHasHydrated] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required to track hydration state
    setAppHasHydrated(true)
  }, [])

  useEffect(() => {
    applyMode(isDarkTheme ? Mode.Dark : Mode.Light)
  }, [isDarkTheme])

  return <GlobalStyle appHasHydrated={appHasHydrated} />
}
