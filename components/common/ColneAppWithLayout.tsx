import { AppProps } from 'next/app'
import React, { useCallback, useEffect, useState } from 'react'
import { useDarkTheme } from 'libs/dom/useDarkTheme'
import { applyMode, Mode } from '@cloudscape-design/global-styles'
import { AppLayout, TopNavigation } from '@cloudscape-design/components'
import { useAppSelector } from 'store'
import { useCSRFToken } from 'store/common/commonHooks'
import { ColneSideNavigation } from 'components/common/ColneSideNavigation'

export function ColneAppWithLayout({ Component, pageProps }: AppProps) {
  const [navigationOpen, setNavigationOpen] = useState(false)
  const isDarkTheme = useDarkTheme()
  const toggleNavigation = useCallback(() => {
    setNavigationOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    applyMode(isDarkTheme ? Mode.Dark : Mode.Light)
  }, [isDarkTheme])

  const isLoggedIn = !!useAppSelector((state) => state.user.currentUser)
  const csrfToken = useCSRFToken()

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
        navigation={
          <ColneSideNavigation isLoggedIn={isLoggedIn} csrfToken={csrfToken} />
        }
        toolsHide
      />
    </>
  )
}
