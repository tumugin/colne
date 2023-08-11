import { Box, Button, Header, Link, Table } from '@cloudscape-design/components'
import { IdolStatus } from 'graphql/generated/client'
import { IdolStatusBadge } from 'components/idols/IdolStatusBadge'
import React from 'react'
import { idolDetailPage } from 'utils/urls'
import { onFollowNextLink } from 'utils/router'
import { useRouter } from 'next/navigation'

export function GroupIdolList({
  idols,
  onRemoveIdol,
}: {
  idols: {
    idolCreatedAt: string
    idolId: string
    idolName: string
    idolStatus: IdolStatus
    idolUpdatedAt: string
    userId?: string | null
    user?: {
      userId: string
      userName: string
    } | null
    groups: Array<{
      groupId: string
      groupName: string
    } | null>
  }[]
  onRemoveIdol: (idolId: string) => void
}) {
  const router = useRouter()

  return (
    <Table
      items={idols}
      columnDefinitions={[
        {
          id: 'delete',
          header: '',
          cell: (e) => (
            <Button
              iconName="delete-marker"
              variant="icon"
              onClick={() => onRemoveIdol(e.idolId)}
            />
          ),
        },
        {
          id: 'idolName',
          header: 'アイドル名',
          cell: (item) => (
            <Link
              href={idolDetailPage(item.idolId)}
              onFollow={(e) => onFollowNextLink(router, e)}
            >
              {item.idolName}
            </Link>
          ),
          sortingField: 'idolName',
          isRowHeader: true,
        },
        {
          id: 'idolStatus',
          header: 'ステータス',
          cell: (item) => <IdolStatusBadge status={item.idolStatus} />,
          sortingField: 'idolStatus',
        },
      ]}
      header={
        <Header variant="h2" actions={<Button>アイドルを追加</Button>}>
          アイドル
        </Header>
      }
      empty={
        <Box textAlign="center" color="inherit">
          <b>まだ所属アイドルが登録されていません</b>
        </Box>
      }
    />
  )
}
