import React from 'react'
import { Box, Table } from '@cloudscape-design/components'

export function IdolChekiListView({
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
  return (
    <Table
      columnDefinitions={[
        {
          id: 'id',
          header: 'ID',
          cell: (e) => e.chekiId,
        },
        {
          id: 'date',
          header: 'チェキ撮影日',
          cell: (e) => e.chekiShotAt,
        },
        {
          id: 'count',
          header: '枚数',
          cell: (e) => e.chekiQuantity,
        },
        {
          id: 'regulation',
          header: 'レギュレーション',
          cell: (e) => e.regulation?.regulationName ?? '-',
        },
        {
          id: 'price',
          header: '価格',
          cell: (e) =>
            e.regulation?.regulationUnitPrice
              ? e.regulation.regulationUnitPrice * e.chekiQuantity + '円'
              : '-',
        },
      ]}
      items={chekis}
      loadingText="読み込み中"
      loading={isLoading}
      trackBy="id"
      empty={
        <Box textAlign="center" color="inherit">
          <b>撮影されたチェキがありません</b>
        </Box>
      }
    />
  )
}
