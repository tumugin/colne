import React from 'react'
import { IdolChekiStatsView } from 'components/idols/idolChekiStatsView'

interface StatItem {
  name: string
  value: number
  unitName: string
}

export function IdolChekiStats({
  isLoading,
  chekis,
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
}) {
  return <IdolChekiStatsView isLoading={isLoading} stats={[]} />
}
