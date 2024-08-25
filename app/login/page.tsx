import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getCurrentUser } from 'api-client/user'
import { redirect } from 'next/navigation'
import { Login } from 'components/page-components/Login'
import { applicationName } from 'libs/app-const'
import { checkRedirectPath } from 'libs/redirect'

export const metadata = {
  title: `ログイン - ${applicationName}`,
}

export default async function Page({
  searchParams,
}: {
  searchParams: { return_to: string | undefined }
}) {
  const header = getAuthCookieNextHeaders()
  const user = await getCurrentUser(header)

  if (user) {
    redirect(
      searchParams.return_to && checkRedirectPath(searchParams.return_to)
        ? searchParams.return_to
        : '/',
    )
  }

  return (
    <Login
      returnTo={
        searchParams.return_to && checkRedirectPath(searchParams.return_to)
          ? searchParams.return_to
          : undefined
      }
    />
  )
}
