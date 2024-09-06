import React from 'react'
import { ColneAppWithLayout } from 'components/common/ColneAppWithLayout'
import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getCurrentUser } from 'api-client/user'
import { getCSRFToken } from 'api-client/common'

export default async function Template({ children }: { children: React.ReactNode }) {
  const header = getAuthCookieNextHeaders()
  const currentUser = await getCurrentUser(header)
  const csrfToken = await getCSRFToken(header)

  return (
    <ColneAppWithLayout user={currentUser} csrfToken={csrfToken}>
      {children}
    </ColneAppWithLayout>
  )
}
