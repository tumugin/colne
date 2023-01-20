import React from 'react'
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
  dateRange: ColneDateRange | null
  onDateRangeChange: (dateRange: ColneDateRange | null) => void
}) {
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
      <IdolChekiStatsView isLoading={isLoading} stats={[]} />
    </>
  )
}
