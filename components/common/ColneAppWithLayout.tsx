'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { AppLayout, TopNavigation } from '@cloudscape-design/components'
import { ColneSideNavigation } from 'components/common/ColneSideNavigation'
import { useRouter } from 'next/navigation'
import {
  chekiAddPath,
  loginPath,
  userCreatedGroupsListPath,
  userCreatedIdolListPath,
  userProfilePage,
} from 'utils/urls'
import { useLogoutForm } from 'components/common/LogoutForm'
import { Toaster } from 'react-hot-toast'
import { useRecoilState } from 'recoil'
import {
  globalNavigationStateAtom,
  splitPanelStateAtom,
} from 'recoil-store/globalPage'
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
  const [isGlobalNavigationOpen, setIsGlobalNavigationOpen] = useRecoilState(
    globalNavigationStateAtom,
  )
  const toggleNavigation = useCallback(() => {
    setIsGlobalNavigationOpen((prev) => !prev)
  }, [setIsGlobalNavigationOpen])

  const isLoggedIn = !!user
  const [logoutFormElement, triggerLogout] = useLogoutForm({ csrfToken })
  const [splitPanelState, setSplitPanelState] =
    useRecoilState(splitPanelStateAtom)

  // FIXME: SSRするとナビゲーション周りでhydrationが壊れるのでworkaround
  // cloudscape-design〜〜〜〜なんとかしてくれ〜〜〜〜〜
  const [, setIsNavigationInitialized] = useState(false)
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
            type: 'button',
            text: 'チェキ追加',
            href: chekiAddPath,
            onClick: (e) => {
              e.preventDefault()
              router.push(chekiAddPath)
            },
          },
          {
            type: 'button',
            text: 'アイドル',
            href: userCreatedIdolListPath,
            onClick: (e) => {
              e.preventDefault()
              router.push(userCreatedIdolListPath)
            },
          },
          {
            type: 'button',
            text: 'グループ',
            href: userCreatedGroupsListPath,
            onClick: (e) => {
              e.preventDefault()
              router.push(userCreatedGroupsListPath)
            },
          },
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
        onNavigationChange={toggleNavigation}
        navigationHide
        navigationOpen={isGlobalNavigationOpen}
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
