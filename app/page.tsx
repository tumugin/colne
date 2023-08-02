import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getCurrentUser } from 'api-client/user'
import React from 'react'
import { Home } from 'components/page-components/Home'
import {
  createThisMonthDateRange,
  getCurrentUserChekiIdolCount,
} from 'api-client/cheki'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { RevalidatePage } from 'components/next-utils/RevalidatePage'

export const dynamic = 'force-dynamic'

export default async function PageHome() {
  const header = getAuthCookieNextHeaders()
  const currentUser = await getCurrentUser(header)

  dayjs.extend(utc)
  dayjs.extend(timezone)

  const currentUserChekiCount = currentUser
    ? await getCurrentUserChekiIdolCount(
        // FIXME: We must handle the user's correct timezone
        {
          ...createThisMonthDateRange(dayjs().tz('Asia/Tokyo')),
        },
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
