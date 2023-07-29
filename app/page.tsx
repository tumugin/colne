import { getHackedNextHeaders } from 'libs/next/nextHeadersHack'
import { getCurrentUser } from 'api-client/user'
import React from 'react'
import { Home } from 'components/page-components/Home'
import {
  createThisMonthDateRange,
  getCurrentUserChekiIdolCount,
} from 'api-client/cheki'
import dayjs from 'dayjs'
import { RevalidatePage } from 'components/next-utils/RevalidatePage'

export default async function PageHome() {
  const header = getHackedNextHeaders()
  const currentUser = await getCurrentUser(header)
  const currentUserChekiCount = currentUser
    ? await getCurrentUserChekiIdolCount(
        // FIXME: We must handle the user's correct timezone
        { ...createThisMonthDateRange(dayjs()) },
        header,
      )
    : []

  return (
    <>
      <RevalidatePage />
      <Home
        currentUser={currentUser}
        currentUserChekiCount={currentUserChekiCount}
      />
    </>
  )
}
