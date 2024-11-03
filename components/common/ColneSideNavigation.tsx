import { SideNavigation } from '@cloudscape-design/components'
import {
  allChekisPath,
  chekiAddPath,
  chekiAnalyticsPath,
  loginPath,
  userCreatedGroupsListPath,
  userCreatedIdolListPath,
} from 'utils/urls'
import { usePathname, useRouter } from 'next/navigation'
import { useLogoutForm } from 'components/common/LogoutForm'

export function ColneSideNavigation({
  isLoggedIn,
  csrfToken,
}: {
  isLoggedIn: boolean
  csrfToken: string
}) {
  const pathName = usePathname()
  const router = useRouter()
  const [logoutFormElement, triggerLogout] = useLogoutForm({ csrfToken })

  return (
    <>
      {logoutFormElement}
      <SideNavigation
        activeHref={pathName}
        onFollow={(event) => {
          if (event.detail.href === '#logout') {
            triggerLogout()
            return
          }
          if (!event.detail.external) {
            event.preventDefault()
            router.push(event.detail.href)
          }
        }}
        items={[
          { type: 'link', text: 'トップ', href: '/' },
          { type: 'divider' },
          ...(isLoggedIn
            ? ([
                {
                  type: 'link',
                  text: 'アイドル',
                  href: userCreatedIdolListPath,
                },
                {
                  type: 'link',
                  text: 'グループ',
                  href: userCreatedGroupsListPath,
                },
                { type: 'divider' },
                {
                  type: 'link',
                  text: 'チェキの統計を見る',
                  href: chekiAnalyticsPath,
                },
                {
                  type: 'link',
                  text: 'チェキを登録する',
                  href: chekiAddPath,
                },
                {
                  type: 'link',
                  text: 'すべてのチェキを見る',
                  href: allChekisPath,
                },
                { type: 'divider' },
                {
                  type: 'link',
                  text: 'ログアウト',
                  href: '#logout',
                },
              ] as const)
            : ([
                {
                  type: 'link',
                  text: 'ログイン',
                  href: loginPath,
                },
                {
                  type: 'link',
                  text: '新規登録',
                  href: loginPath,
                },
              ] as const)),
        ]}
      />
    </>
  )
}
