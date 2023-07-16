'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { AppLayout, TopNavigation } from '@cloudscape-design/components'
import { ColneSideNavigation } from 'components/common/ColneSideNavigation'
import { useRouter } from 'next/navigation'
import { loginPath } from 'utils/urls'
import { useLogoutForm } from 'components/common/LogoutForm'
import { Toaster } from 'react-hot-toast'
import { useRecoilState } from 'recoil'
import { splitPanelStateAtom } from 'recoil-store/globalPage'
import { CurrentUser } from 'api-client/user'

export function ColneAppWithLayout({
  children,
  user,
  csrfToken,
}: {
  children: React.ReactNode
  user: CurrentUser | null
  csrfToken: string
}) {
  const router = useRouter()
  const [navigationOpen, setNavigationOpen] = useState(false)
  const toggleNavigation = useCallback(() => {
    setNavigationOpen((prev) => !prev)
  }, [])

  const isLoggedIn = !!user
  const [logoutFormElement, triggerLogout] = useLogoutForm({ csrfToken })
  const [splitPanelState, setSplitPanelState] =
    useRecoilState(splitPanelStateAtom)

  // FIXME: SSRするとナビゲーション周りでhydrationが壊れるのでworkaround
  // cloudscape-design〜〜〜〜なんとかしてくれ〜〜〜〜〜
  const [isNavigationInitialized, setIsNavigationInitialized] = useState(false)
  useEffect(() => {
    setIsNavigationInitialized(true)
  }, [])

  return (
    <>
      <Toaster />
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
        content={children}
        onNavigationChange={toggleNavigation}
        navigationHide={!isNavigationInitialized}
        navigationOpen={navigationOpen}
        navigation={
          <ColneSideNavigation isLoggedIn={isLoggedIn} csrfToken={csrfToken} />
        }
        splitPanelOpen={splitPanelState.splitPanelOpen}
        onSplitPanelToggle={(e) =>
          setSplitPanelState((s) => ({ ...s, splitPanelOpen: e.detail.open }))
        }
        splitPanel={splitPanelState.children}
        toolsHide
      />
    </>
  )
}
