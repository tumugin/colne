import { ChekisAdd } from 'components/page-components/ChekisAdd'
import { getHackedNextHeaders } from 'libs/next/nextHeadersHack'
import { getCurrentUser } from 'api-client/user'
import { NextRequest } from 'next/server'
import { redirectToLoginPage } from 'utils/no-login-redirect'

export default async function PageAdd(request: NextRequest) {
  const header = getHackedNextHeaders()
  const currentUser = await getCurrentUser(header)

  if (!currentUser) {
    redirectToLoginPage(request)
  }

  return <ChekisAdd />
}
