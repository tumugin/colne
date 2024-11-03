import React from 'react'
import { Box, Button, Table } from '@cloudscape-design/components'
import dayjs from 'dayjs'
import { IdolCheki } from 'api-client/cheki'

export function AllChekiList({
  isLoading,
  chekis,
  onDeleteCheki,
}: {
  isLoading: boolean
  chekis: (IdolCheki & { idol?: { idolId: string; idolName: string } | null })[]
  onDeleteCheki: (chekiId: string) => void
}) {
  return (
    <Table
      columnDefinitions={[
        {
          id: 'delete',
          header: '',
          cell: (e) => (
            <Button
              iconName="delete-marker"
              variant="icon"
              onClick={() => onDeleteCheki(e.chekiId)}
            />
          ),
        },
        {
          id: 'date',
          header: 'チェキ撮影日',
          cell: (e) => dayjs(e.chekiShotAt).format('YYYY/MM/DD'),
        },
        {
          id: 'created_at',
          header: '登録日',
          cell: (e) => dayjs(e.chekiCreatedAt).format('YYYY/MM/DD HH:mm:ss'),
        },
        {
          id: 'count',
          header: '枚数',
          cell: (e) => e.chekiQuantity.toLocaleString('ja-JP'),
        },
        {
          id: 'idol',
          header: 'アイドル',
          cell: (e) => e.idol?.idolName ?? '(削除されたアイドル)',
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
              ? (
                  e.regulation.regulationUnitPrice * e.chekiQuantity
                ).toLocaleString('ja-JP') + '円'
              : '-',
        },
      ]}
      items={chekis}
      loadingText="読み込み中"
      loading={isLoading}
      trackBy="chekiId"
      empty={
        <Box textAlign="center" color="inherit">
          <b>撮影されたチェキがありません</b>
        </Box>
      }
    />
  )
}
