import { AppProps } from 'next/app'
import React, { useCallback, useState } from 'react'
import { AppLayout, TopNavigation } from '@cloudscape-design/components'
import { useAppSelector } from 'store'
import { useCSRFToken } from 'store/common/commonHooks'
import { ColneSideNavigation } from 'components/common/ColneSideNavigation'
import { useRouter } from 'next/router'
import { loginPath } from 'utils/urls'
import { useLogoutForm } from 'components/common/LogoutForm'

export function ColneAppWithLayout({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [navigationOpen, setNavigationOpen] = useState(false)
  const toggleNavigation = useCallback(() => {
    setNavigationOpen((prev) => !prev)
  }, [])

  const user = useAppSelector((state) => state.user.currentUser)
  const isLoggedIn = !!user
  const csrfToken = useCSRFToken()
  const [logoutFormElement, triggerLogout] = useLogoutForm({ csrfToken })

  return (
    <>
      {logoutFormElement}
      <TopNavigation
        identity={{
          href: '/',
          title: 'チェキを管理するやつ(仮)',
          onFollow: async (e) => {
            e.preventDefault()
            await router.push('/')
          },
        }}
        i18nStrings={{
          searchIconAriaLabel: 'Search',
          searchDismissIconAriaLabel: 'Close search',
          overflowMenuTriggerText: 'More',
          overflowMenuTitleText: 'All',
          overflowMenuBackIconAriaLabel: 'Back',
          overflowMenuDismissIconAriaLabel: 'Close menu',
        }}
        utilities={[
          {
            type: 'menu-dropdown',
            text: user?.userName ?? 'ゲスト',
            iconName: 'user-profile',
            items: [
              ...(isLoggedIn
                ? ([{ id: 'logout', text: 'ログアウト' }] as const)
                : ([
                    { id: 'login', href: loginPath, text: 'ログイン' },
                    { id: 'register', href: loginPath, text: '新規登録' },
                  ] as const)),
            ],
            onItemClick: (e) => {
              if (e.detail.id === 'logout') {
                triggerLogout()
              }
            },
          },
        ]}
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
