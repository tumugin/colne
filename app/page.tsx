import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getCurrentUser } from 'api-client/user'
import React from 'react'
import { Home } from 'components/page-components/Home'
import { HomeNoLogin } from 'components/page-components/HomeNoLogin'

export const dynamic = 'force-dynamic'

export default async function PageHome() {
  const header = await getAuthCookieNextHeaders()
  const currentUser = await getCurrentUser(header)

  return <>{currentUser ? <Home /> : <HomeNoLogin />}</>
}
