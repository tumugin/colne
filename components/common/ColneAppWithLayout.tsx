'use client'

import React, { useEffect, useState } from 'react'
import { AppLayout, TopNavigation } from '@cloudscape-design/components'
import { ColneSideNavigation } from 'components/common/ColneSideNavigation'
import { useRouter } from 'next/navigation'
import { loginPath, userProfilePage } from 'utils/urls'
import { useLogoutForm } from 'components/common/LogoutForm'
import { Toaster } from 'react-hot-toast'
import { useRecoilState } from 'recoil'
import { splitPanelStateAtom } from 'recoil-store/globalPage'
import { CurrentUser } from 'api-client/user'
import { useConsoleEasterEgg } from 'utils/easteregg-hooks'
import { AppLayoutProps } from '@cloudscape-design/components/app-layout/interfaces'

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

  const isLoggedIn = !!user
  const [logoutFormElement, triggerLogout] = useLogoutForm({ csrfToken })
  const [splitPanelState, setSplitPanelState] =
    useRecoilState(splitPanelStateAtom)
  const [splitPanelPreference, setSplitPanelPreference] =
    useState<AppLayoutProps.SplitPanelPreferences>({
      position: 'side',
    })

  // FIXME: SSRするとナビゲーション周りでhydrationが壊れるのでworkaround
  // cloudscape-design〜〜〜〜なんとかしてくれ〜〜〜〜〜
  const [isNavigationInitialized, setIsNavigationInitialized] = useState(false)
  useEffect(() => {
    setIsNavigationInitialized(true)
  }, [])

  useConsoleEasterEgg()

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
            router.push('/')
          },
        }}
        i18nStrings={{
          searchIconAriaLabel: 'Search',
          searchDismissIconAriaLabel: 'Close search',
          overflowMenuTriggerText: 'Menu',
          overflowMenuTitleText: 'メニュー',
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
                ? ([
                    {
                      id: 'user-profile',
                      href: userProfilePage,
                      text: 'プロフィール',
                    },
                    { id: 'logout', text: 'ログアウト' },
                  ] as const)
                : ([
                    { id: 'login', href: loginPath, text: 'ログイン' },
                    { id: 'register', href: loginPath, text: '新規登録' },
                  ] as const)),
            ],
            onItemClick: (e) => {
              if (e.detail.id === 'logout') {
                triggerLogout()
              }
              if (e.detail.id === 'user-profile') {
                router.push(userProfilePage)
                e.preventDefault()
              }
            },
          },
        ]}
      />
      <AppLayout
        content={children}
        navigationHide={!isNavigationInitialized}
        navigation={
          isNavigationInitialized && (
            <ColneSideNavigation
              isLoggedIn={isLoggedIn}
              csrfToken={csrfToken}
            />
          )
        }
        splitPanelOpen={splitPanelState.splitPanelOpen}
        onSplitPanelToggle={(e) =>
          setSplitPanelState((s) => ({ ...s, splitPanelOpen: e.detail.open }))
        }
        splitPanel={splitPanelState.children}
        splitPanelPreferences={splitPanelPreference}
        onSplitPanelPreferencesChange={(e) => setSplitPanelPreference(e.detail)}
        toolsHide
      />
    </>
  )
}
