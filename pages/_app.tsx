import '../styles/globals.css'
import '@cloudscape-design/global-styles/index.css'
import type { AppProps } from 'next/app'
import { AppLayout, TopNavigation } from '@cloudscape-design/components'
import React, { useCallback, useEffect, useState } from 'react'
import { applyMode, Mode } from '@cloudscape-design/global-styles'
import { useDarkTheme } from 'libs/dom/useDarkTheme'
import { store } from '../store'
import { Provider } from 'react-redux'

export default function ColneApp(props: AppProps) {
  return (
    <Provider store={store}>
      <AppWithLayout {...props} />
    </Provider>
  )
}

function AppWithLayout({ Component, pageProps }: AppProps) {
  const [navigationOpen, setNavigationOpen] = useState(false)
  const isDarkTheme = useDarkTheme()
  const toggleNavigation = useCallback(() => {
    setNavigationOpen((prev) => !prev)
  }, [])
  useEffect(() => {
    applyMode(isDarkTheme ? Mode.Dark : Mode.Light)
  }, [isDarkTheme])

  return (
    <>
      <TopNavigation
        identity={{
          href: '/',
          title: 'チェキを管理するやつ(仮)',
        }}
        i18nStrings={{
          searchIconAriaLabel: 'Search',
          searchDismissIconAriaLabel: 'Close search',
          overflowMenuTriggerText: 'More',
          overflowMenuTitleText: 'All',
          overflowMenuBackIconAriaLabel: 'Back',
          overflowMenuDismissIconAriaLabel: 'Close menu',
        }}
      />
      <AppLayout
        content={<Component {...pageProps} />}
        onNavigationChange={toggleNavigation}
        navigationOpen={navigationOpen}
        toolsHide
      />
    </>
  )
}
