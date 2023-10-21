'use client'

import {
  Container,
  ContentLayout,
  Grid,
  Header,
  SpaceBetween,
  Toggle,
} from '@cloudscape-design/components'
import {
  ColneDataRangePicker,
  ColneDateRange,
} from 'components/parts/ColneDataRangePicker'
import React, { useCallback, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import dayjs from 'dayjs'
import { AnalyticsChekiCount } from 'components/analytics/AnalyticsChekiCount'
import { AnalyticsTotalChekiCount } from 'components/analytics/AnalyticsTotalChekiCount'
import { AnalyticsTopIdol } from 'components/analytics/AnalyticsTopIdol'
import { ChekiByIdolAnalytics } from 'components/analytics/ChekiByIdolAnalytics'
import { AnalyticsTotalChekiPrice } from 'components/analytics/AnalyticsTotalChekiPrice'

export function ChekisAnalytics({
  range,
  chekiCounts,
}: {
  range: {
    startISOString: string
    endISOString: string
  }
  chekiCounts: {
    chekiCount: number
    totalPrice: number
    idol?: {
      idolId: string
      idolName: string
    } | null
  }[]
}) {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const onDataTimeRangeChange = useCallback(
    (dateRange: ColneDateRange | null) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()))
      dateRange?.startISOString &&
        current.set('start', dateRange.startISOString)
      dateRange?.endISOString && current.set('end', dateRange.endISOString)
      router.push(`${pathName}?${current.toString()}`)
    },
    [pathName, router, searchParams],
  )
  const parsedRangeStart = useMemo(
    () => dayjs(range.startISOString),
    [range.startISOString],
  )
  const parsedRangeEnd = useMemo(
    () => dayjs(range.endISOString),
    [range.endISOString],
  )
  const totalChekiCount = useMemo(
    () => chekiCounts.reduce((acc, cur) => acc + (cur?.chekiCount ?? 0), 0),
    [chekiCounts],
  )
  const sortedChekiCounts = useMemo(
    () => [...chekiCounts].sort((a, b) => b.chekiCount - a.chekiCount),
    [chekiCounts],
  )
  const totalChekiPrice = useMemo(
    () =>
      chekiCounts
        .map((v) => v.totalPrice)
        .reduce((acc, cur) => acc + (cur ?? 0), 0),
    [chekiCounts],
  )
  const [totalChekiPriceHidden, setTotalChekiPriceHidden] = useState(true)

  return (
    <ContentLayout>
      <SpaceBetween size="xl">
        <Container
          header={
            <Header
              variant="h2"
              actions={
                <ColneDataRangePicker
                  dateRange={range}
                  onDateRangeChange={onDataTimeRangeChange}
                />
              }
            >
              チェキ撮影枚数統計({parsedRangeStart.format('YYYY/MM/DD')}-
              {parsedRangeEnd.format('YYYY/MM/DD')})
            </Header>
          }
        />
        <Container header={<Header variant="h2">チェキ撮影枚数</Header>}>
          <AnalyticsChekiCount chekiCounts={chekiCounts} />
        </Container>
        <Grid
          gridDefinition={[
            { colspan: { default: 12, m: 4, xs: 6 } },
            { colspan: { default: 12, m: 4, xs: 6 } },
            { colspan: { default: 12, m: 4, xs: 12 } },
          ]}
        >
          <Container header={<Header variant="h2">累計チェキ撮影枚数</Header>}>
            <AnalyticsTotalChekiCount totalChekiCount={totalChekiCount} />
          </Container>
          <Container
            header={<Header variant="h2">一番撮影されたアイドル</Header>}
          >
            <AnalyticsTopIdol
              idol={sortedChekiCounts[0]?.idol ?? null}
              chekiCount={sortedChekiCounts[0]?.chekiCount ?? null}
            />
          </Container>
          <Container
            header={
              <Header
                variant="h2"
                actions={
                  <Toggle
                    checked={totalChekiPriceHidden}
                    onChange={() => setTotalChekiPriceHidden((p) => !p)}
                  />
                }
              >
                累計の金額
              </Header>
            }
          >
            <AnalyticsTotalChekiPrice
              totalPrice={totalChekiPrice}
              hidden={totalChekiPriceHidden}
            />
          </Container>
        </Grid>
        <Container header={<Header variant="h2">チェキ統計</Header>}>
          <ChekiByIdolAnalytics chekiCounts={chekiCounts} />
        </Container>
      </SpaceBetween>
    </ContentLayout>
  )
}
