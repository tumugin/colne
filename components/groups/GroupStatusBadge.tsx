import { Badge } from '@cloudscape-design/components'

export function GroupStatusBadge({
  status,
}: {
  status:
    | 'OPERATION_DELETED'
    | 'PRIVATE_ACTIVE'
    | 'PRIVATE_NOT_ACTIVE'
    | 'PUBLIC_ACTIVE'
    | 'PUBLIC_NOT_ACTIVE'
}) {
  const statusToBadge = {
    OPERATION_DELETED: {
      text: '管理者によって削除',
      color: 'red',
    },
    PRIVATE_ACTIVE: {
      text: '非公開',
      color: 'blue',
    },
    PRIVATE_NOT_ACTIVE: {
      text: '非公開(活動休止もしくは解散済み)',
      color: 'grey',
    },
    PUBLIC_ACTIVE: {
      text: '公開',
      color: 'green',
    },
    PUBLIC_NOT_ACTIVE: {
      text: '公開(活動休止もしくは解散済み)',
      color: 'grey',
    },
  } as const

  return (
    <Badge color={statusToBadge[status].color}>
      {statusToBadge[status].text}
    </Badge>
  )
}
