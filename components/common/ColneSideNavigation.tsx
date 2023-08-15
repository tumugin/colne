import { SideNavigation } from '@cloudscape-design/components'
import {
  chekiAddPath,
  loginPath,
  userCreatedGroupsListPath,
  userCreatedIdolListPath,
} from 'utils/urls'
import { usePathname, useRouter } from 'next/navigation'
import { useLogoutForm } from 'components/common/LogoutForm'
import { useRecoilState } from 'recoil'
import { globalNavigationStateAtom } from 'recoil-store/globalPage'

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
  const [, setIsGlobalNavigationOpen] = useRecoilState(
    globalNavigationStateAtom,
  )

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
            setIsGlobalNavigationOpen(false)
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
                  text: '登録したアイドル一覧',
                  href: userCreatedIdolListPath,
                },
                {
                  type: 'link',
                  text: '登録したグループ一覧',
                  href: userCreatedGroupsListPath,
                },
                {
                  type: 'link',
                  text: 'チェキを登録する',
                  href: chekiAddPath,
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
