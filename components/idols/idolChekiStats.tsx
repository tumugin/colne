import React, { useMemo } from 'react'
import {
  IdolChekiStatsView,
  StatItem,
} from 'components/idols/idolChekiStatsView'
import { Box, Container, Header } from '@cloudscape-design/components'
import {
  ColneDataRangePicker,
  ColneDateRange,
} from 'components/parts/ColneDataRangePicker'
import dayjs from 'dayjs'
import { nonNullable } from 'utils/array'
import { IdolChekiListView } from 'components/idols/idolChekiListView'
import { ChekiMonthCountByIdolItem, IdolCheki } from 'api-client/cheki'
import { AnalyticsIdolChekiCountByMonth } from 'components/analytics/AnalyticsIdolChekiCountByMonth'

export function IdolChekiStats({
  isLoading,
  chekiCountByMonthIsLoading,
  chekiCountByMonth,
  chekis,
  dateRange,
  onDateRangeChange,
  onDeleteCheki,
}: {
  isLoading: boolean
  chekiCountByMonthIsLoading: boolean
  chekiCountByMonth: ChekiMonthCountByIdolItem[]
  chekis: IdolCheki[]
  dateRange: ColneDateRange
  onDateRangeChange: (dateRange: ColneDateRange | null) => void
  onDeleteCheki: (chekiId: string) => void
}) {
  const chekiQuantity = useMemo(
    () =>
      chekis
        .map((c) => c.chekiQuantity)
        .reduce((sum, element) => sum + element, 0),
    [chekis],
  )
  const weekCount = useMemo(
    () => dayjs(dateRange.endISOString).diff(dateRange.startISOString, 'week'),
    [dateRange.endISOString, dateRange.startISOString],
  )
  const chekiQuantityByWeek = useMemo(
    () => (weekCount !== 0 ? chekiQuantity / weekCount : '-'),
    [chekiQuantity, weekCount],
  )
  const totalPrice = useMemo(
    () =>
      chekis
        .map((c) => (c.regulation?.regulationUnitPrice ?? 0) * c.chekiQuantity)
        .reduce((sum, element) => sum + element, 0),
    [chekis],
  )
  const regulations = useMemo(
    () =>
      chekis
        .map((c) => c.regulation)
        .filter(nonNullable)
        .map(
          (c) =>
            `${c.regulationName} - ${c.group?.groupName ?? '不明なグループ'}`,
        ),
    [chekis],
  )
  const bestUsedRegulation = useMemo(
    () =>
      regulations
        .sort(
          (a, b) =>
            chekis.filter((v) => v.regulation?.regulationName === a).length -
            chekis.filter((v) => v.regulation?.regulationName === b).length,
        )
        .pop() ?? '-',
    [chekis, regulations],
  )
  const statItems = useMemo<StatItem[]>(
    () => [
      {
        id: '1',
        name: 'チェキ撮影枚数',
        value: chekiQuantity.toLocaleString('ja-JP'),
        unitName: '枚',
      },
      {
        id: '2',
        name: 'チェキ撮影枚数/週',
        value: chekiQuantityByWeek.toLocaleString('ja-JP'),
        unitName: '枚/週',
      },
      {
        id: '3',
        name: '一番使用されたレギュレーション',
        value: bestUsedRegulation,
        smallText: true,
      },
      {
        id: '4',
        name: '合計使用金額',
        value: totalPrice.toLocaleString('ja-JP'),
        unitName: '円',
        defaultHidden: true,
      },
    ],
    [bestUsedRegulation, chekiQuantity, chekiQuantityByWeek, totalPrice],
  )

  return (
    <>
      <Box padding={{ bottom: 'xl' }}>
        <Container header={<Header variant="h2">月別チェキ撮影統計</Header>}>
          <AnalyticsIdolChekiCountByMonth
            isLoading={chekiCountByMonthIsLoading}
            stats={chekiCountByMonth}
          />
        </Container>
      </Box>
      <Box padding={{ bottom: 'l' }}>
        <Container
          header={
            <Header
              variant="h2"
              actions={
                <ColneDataRangePicker
                  dateRange={dateRange}
                  onDateRangeChange={onDateRangeChange}
                />
              }
            >
              チェキ撮影枚数統計
            </Header>
          }
        />
      </Box>
      <IdolChekiStatsView isLoading={isLoading} stats={statItems} />
      <IdolChekiListView
        isLoading={isLoading}
        chekis={chekis}
        onDeleteCheki={onDeleteCheki}
      />
    </>
  )
}
