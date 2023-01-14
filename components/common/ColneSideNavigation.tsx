import { SideNavigation } from '@cloudscape-design/components'
import { loginPath, userCreatedIdolListPath } from 'utils/urls'
import { useRouter } from 'next/router'
import { useLogoutForm } from 'components/common/LogoutForm'

export function ColneSideNavigation({
  isLoggedIn,
  csrfToken,
}: {
  isLoggedIn: boolean
  csrfToken: string
}) {
  const router = useRouter()
  const [logoutFormElement, triggerLogout] = useLogoutForm({ csrfToken })

  return (
    <>
      {logoutFormElement}
      <SideNavigation
        activeHref={router.pathname}
        onFollow={async (event) => {
          if (event.detail.href === '#logout') {
            triggerLogout()
            return
          }
          if (!event.detail.external) {
            event.preventDefault()
            await router.push(event.detail.href)
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
