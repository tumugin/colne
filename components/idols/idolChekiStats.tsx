import React, { useMemo } from 'react'
import { IdolChekiStatsView } from 'components/idols/idolChekiStatsView'
import {
  Container,
  DateRangePicker,
  DateRangePickerProps,
  Header,
} from '@cloudscape-design/components'
import {
  ColneDataRangePicker,
  ColneDateRange,
} from 'components/parts/ColneDataRangePicker'
import dayjs from 'dayjs'

interface StatItem {
  name: string
  value: number
  unitName: string
}

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
    [chekis]
  )
  const chekiQuantityByWeek = useMemo(
    () =>
      chekiQuantity /
      dayjs(dateRange.endISOString).diff(dateRange.startISOString, 'week'),
    [chekiQuantity, dateRange.endISOString, dateRange.startISOString]
  )
  const statItems = useMemo<StatItem[]>(
    () => [
      {
        name: 'チェキ撮影枚数',
        value: chekiQuantity,
        unitName: '枚',
      },
      {
        name: 'チェキ撮影枚数/週',
        value: chekiQuantityByWeek,
        unitName: '枚/週',
      },
    ],
    [chekiQuantity, chekiQuantityByWeek]
  )

  return (
    <>
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
        disableContentPaddings
      />
      <IdolChekiStatsView isLoading={isLoading} stats={statItems} />
    </>
  )
}
