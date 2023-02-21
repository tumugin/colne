import { GroupStatus } from 'graphql/generated/client'

type groupStatus =
  | 'private_active'
  | 'private_not_active'
  | 'public_active'
  | 'public_not_active'

export function mapEditorGroupStatusToGraphQlType(groupStatus: groupStatus) {
  switch (groupStatus) {
    case 'private_active':
      return GroupStatus.PrivateActive
    case 'private_not_active':
      return GroupStatus.PrivateNotActive
    case 'public_active':
      return GroupStatus.PublicActive
    case 'public_not_active':
      return GroupStatus.PublicNotActive
  }
}

export function GraphQlTypeToEditorGroupStatus(
  groupStatus: Omit<GroupStatus, GroupStatus.OperationDeleted>
) {
  switch (groupStatus) {
    case GroupStatus.PrivateActive:
      return 'private_active'
    case GroupStatus.PrivateNotActive:
      return 'private_not_active'
    case GroupStatus.PublicActive:
      return 'public_active'
    case GroupStatus.PublicNotActive:
      return 'public_not_active'
    default:
      throw new Error(`${groupStatus} is not a valid status for editor`)
  }
}
