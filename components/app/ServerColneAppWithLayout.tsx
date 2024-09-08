import { getCSRFToken } from 'api-client/common'
import { getCurrentUser } from 'api-client/user'
import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { ColneAppWithLayout } from 'components/common/ColneAppWithLayout'

export async function ServerColneAppWithLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const header = getAuthCookieNextHeaders()
  const currentUser = await getCurrentUser(header)
  const csrfToken = await getCSRFToken(header)

  return (
    <ColneAppWithLayout user={currentUser} csrfToken={csrfToken}>
      {children}
    </ColneAppWithLayout>
  )
}
