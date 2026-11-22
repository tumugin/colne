import { ChekisAnalytics } from 'components/page-components/ChekisAnalytics'
import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import {
  getCurrentUserChekiIdolCount,
  getCurrentUserChekiIdolGroupCount,
} from 'api-client/cheki'
import dayjs from 'dayjs'
import { applicationName } from 'libs/app-const'

export const metadata = {
  title: `チェキ統計 - ${applicationName}`,
}

export default async function Page(props: {
  searchParams: Promise<{
    start: string | undefined
    end: string | undefined
  }>
}) {
  const searchParams = await props.searchParams
  const header = await getAuthCookieNextHeaders()
  const start = searchParams.start
    ? dayjs(searchParams.start)
    : dayjs().subtract(1, 'months')
  const end = searchParams.end ? dayjs(searchParams.end) : dayjs()
  const dateRange = { startDate: start, endDate: end }
  const [chekiCounts, groupedChekiCounts] = await Promise.all([
    getCurrentUserChekiIdolCount(dateRange, header),
    getCurrentUserChekiIdolGroupCount(dateRange, header),
  ])

  return (
    <ChekisAnalytics
      range={{
        startISOString: start.toISOString(),
        endISOString: end.toISOString(),
      }}
      chekiCounts={chekiCounts}
      groupedChekiCounts={groupedChekiCounts}
    />
  )
}
