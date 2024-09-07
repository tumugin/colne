import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getCurrentUser } from 'api-client/user'
import { UserProfile } from 'components/page-components/UserProfile'
import { notFound } from 'next/navigation'
import { applicationName } from 'libs/app-const'

export const metadata = {
  title: `プロフィール - ${applicationName}`,
}

export default async function Page() {
  const header = getAuthCookieNextHeaders()
  const currentUser = await getCurrentUser(header)

  if (!currentUser) {
    notFound()
  }

  return <UserProfile currentUser={currentUser} />
}
