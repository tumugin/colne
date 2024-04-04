import { Box, Button, Header, Link, Table } from '@cloudscape-design/components'
import { groupAddRegulationPage, groupRegulationEditPage } from 'utils/urls'
import { onFollowNextLink } from 'utils/router'
import React from 'react'
import { useRouter } from 'next/navigation'
import { RegulationStatusBadge } from 'components/regulations/RegulationStatusBadge'

export function GroupRegulationList({
  regulations,
  groupId,
  enableEdit,
}: {
  regulations: {
    regulationComment: string
    regulationCreatedAt: string
    regulationId: string
    regulationName: string
    regulationStatus: 'ACTIVE' | 'NOT_ACTIVE' | 'OPERATION_DELETED'
    regulationUnitPrice: number
    regulationUpdatedAt: string
  }[]
  groupId: string
  enableEdit: boolean
}) {
  const router = useRouter()

  return (
    <Table
      items={regulations}
      columnDefinitions={[
        {
          id: 'regulationName',
          header: 'レギュレーション名',
          cell: (item) =>
            enableEdit ? (
              <Link
                href={groupRegulationEditPage(groupId, item.regulationId)}
                onFollow={(e) => onFollowNextLink(router, e)}
              >
                {item.regulationName}
              </Link>
            ) : (
              item.regulationName
            ),
        },
        {
          id: 'regulationUnitPrice',
          header: '単価',
          cell: (item) => item.regulationUnitPrice.toLocaleString('ja-JP'),
        },
        {
          id: 'regulationComment',
          header: 'コメント',
          cell: (item) => item.regulationComment,
        },
        {
          id: 'regulationStatus',
          header: 'ステータス',
          cell: (item) => (
            <RegulationStatusBadge regulationStatus={item.regulationStatus} />
          ),
        },
      ]}
      header={
        <Header
          variant="h2"
          actions={
            <Button
              href={groupAddRegulationPage(groupId)}
              onFollow={(e) => onFollowNextLink(router, e)}
            >
              レギュレーションを追加
            </Button>
          }
        >
          レギュレーション
        </Header>
      }
      empty={
        <Box textAlign="center" color="inherit">
          <b>まだレギュレーションが登録されていません</b>
        </Box>
      }
    />
  )
}
