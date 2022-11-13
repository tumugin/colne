import '../styles/globals.css'
import '@cloudscape-design/global-styles/index.css'
import type { AppProps } from 'next/app'
import { AppLayout, TopNavigation } from '@cloudscape-design/components'
import React, { useCallback, useEffect, useState } from 'react'
import { applyMode, Mode } from '@cloudscape-design/global-styles'
import { useDarkTheme } from 'libs/dom/useDarkTheme'
import { wrapper } from '../store'
import { Provider } from 'react-redux'
import { updateCurrentUserState } from '../store/user/userHooks'

function ColneAppWithLayout({ Component, pageProps }: AppProps) {
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

export default function ColneApp(appProps: AppProps) {
  const { store, props } = wrapper.useWrappedStore(appProps)
  return (
    <Provider store={store}>
      <ColneAppWithLayout {...props} />
    </Provider>
  )
}

ColneApp.getInitialPageProps = wrapper.getInitialPageProps(
  (store) => async () => {
    await updateCurrentUserState(store.dispatch)
  }
)
