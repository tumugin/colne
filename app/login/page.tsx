import { getHackedNextHeaders } from 'libs/next/nextHeadersHack'
import { getCurrentUser } from 'api-client/user'
import { redirect } from 'next/navigation'
import { Login } from 'components/page-components/Login'

export default async function Page({
  searchParams,
}: {
  searchParams: { return_to: string | undefined }
}) {
  const header = getHackedNextHeaders()
  const user = await getCurrentUser(header)

  if (user) {
    redirect('/')
  }

  return <Login returnTo={searchParams.return_to} />
}
