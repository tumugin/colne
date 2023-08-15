'use client'

import { ContentLayout, Spinner } from '@cloudscape-design/components'
import { MonthlyChekiCounts } from 'components/top/MonthlyChekiCounts'
import React, { useEffect } from 'react'
import {
  createThisMonthDateRange,
  CurrentUserChekiIdolCount,
  getCurrentUserChekiIdolCount,
} from 'api-client/cheki'
import dayjs from 'dayjs'
import styled from 'styled-components'

const SpinnerBox = styled.div`
  display: grid;
  place-items: center;
  height: calc(100vh - 100px);
`

export function Home() {
  const [currentUserChekiCount, setCurrentUserChekiCount] = React.useState<
    CurrentUserChekiIdolCount[]
  >([])
  const [isFetching, setIsFetching] = React.useState(true)

  useEffect(() => {
    ;(async () => {
      setIsFetching(true)
      const result = await getCurrentUserChekiIdolCount({
        ...createThisMonthDateRange(dayjs()),
      })
      setCurrentUserChekiCount(result)
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
        <MonthlyChekiCounts chekiCounts={currentUserChekiCount} />
      )}
    </ContentLayout>
  )
}
