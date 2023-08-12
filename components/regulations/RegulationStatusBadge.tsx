import { Badge } from '@cloudscape-design/components'

export function RegulationStatusBadge({
  regulationStatus,
}: {
  regulationStatus: 'ACTIVE' | 'NOT_ACTIVE' | 'OPERATION_DELETED'
}) {
  switch (regulationStatus) {
    case 'ACTIVE':
      return <Badge color="green">有効</Badge>
    case 'NOT_ACTIVE':
      return <Badge color="grey">無効</Badge>
    case 'OPERATION_DELETED':
      return <Badge color="red">運営削除</Badge>
  }
}
