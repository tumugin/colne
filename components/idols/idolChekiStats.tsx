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

export function IdolChekiStats({
  isLoading,
  chekis,
  dateRange,
  onDateRangeChange,
}: {
  isLoading: boolean
  chekis: {
    chekiId: string
    idolId?: string
    regulationId?: string
    chekiQuantity: number
    chekiShotAt: string
    regulation?: {
      regulationId: string
      groupId: string
      regulationName: string
      regulationComment: string
      regulationUnitPrice: number
      regulationStatus: string
      group?: {
        groupId: string
        groupName: string
      }
    }
  }[]
  dateRange: ColneDateRange
  onDateRangeChange: (dateRange: ColneDateRange | null) => void
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
            regulations.filter((v) => v === a).length -
            regulations.filter((v) => v === b).length,
        )
        .pop() ?? '-',
    [regulations],
  )
  const statItems = useMemo<StatItem[]>(
    () => [
      {
        id: '1',
        name: 'チェキ撮影枚数',
        value: chekiQuantity,
        unitName: '枚',
      },
      {
        id: '2',
        name: 'チェキ撮影枚数/週',
        value: chekiQuantityByWeek,
        unitName: '枚/週',
      },
      {
        id: '3',
        name: '一番使用されたレギュレーション',
        value: bestUsedRegulation,
      },
      {
        id: '4',
        name: '合計使用金額',
        value: totalPrice,
        unitName: '円',
        defaultHidden: true,
      },
    ],
    [bestUsedRegulation, chekiQuantity, chekiQuantityByWeek, totalPrice],
  )

  return (
    <>
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
      <IdolChekiListView isLoading={isLoading} chekis={chekis} />
    </>
  )
}
