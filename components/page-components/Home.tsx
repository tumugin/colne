'use client'

import {
  ContentLayout,
  SpaceBetween,
  Spinner,
} from '@cloudscape-design/components'
import { MonthlyChekiCounts } from 'components/top/MonthlyChekiCounts'
import React, { useEffect } from 'react'
import {
  ChekiMonthIdolCount,
  createThisMonthDateRange,
  CurrentUserChekiIdolCount,
  getChekiMonthIdolCount,
  getCurrentUserChekiIdolCount,
} from 'api-client/cheki'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { TopAnalyticsView } from 'components/top/TopAnalyticsView'

const SpinnerBox = styled.div`
  display: grid;
  place-items: center;
  height: calc(100vh - 100px);
`

export function Home() {
  const [currentUserChekiCount, setCurrentUserChekiCount] = React.useState<
    CurrentUserChekiIdolCount[]
  >([])
  const [chekiMonthIdolCount, setChekiMonthIdolCount] = React.useState<
    ChekiMonthIdolCount[]
  >([])
  const [isFetching, setIsFetching] = React.useState(true)

  useEffect(() => {
    ;(async () => {
      setIsFetching(true)
      const currentUserChekiIdolCountResult =
        await getCurrentUserChekiIdolCount({
          ...createThisMonthDateRange(dayjs()),
        })
      const chekiMonthIdolCountResult = await getChekiMonthIdolCount(
        Intl.DateTimeFormat().resolvedOptions().timeZone,
      )
      setCurrentUserChekiCount(currentUserChekiIdolCountResult)
      setChekiMonthIdolCount(chekiMonthIdolCountResult)
      setIsFetching(false)
    })()
  }, [])

  return (
    <ContentLayout>
      {isFetching ? (
        <SpinnerBox>
          <Spinner size="large" />
        </SpinnerBox>
      ) : (
        <SpaceBetween size="xl" direction="vertical">
          <MonthlyChekiCounts chekiCounts={currentUserChekiCount} />
          <TopAnalyticsView chekiMonthIdolCount={chekiMonthIdolCount} />
        </SpaceBetween>
      )}
    </ContentLayout>
  )
}
