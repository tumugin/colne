import { IdolStatus } from 'graphql/generated/client'

type idolStatus =
  | 'private_active'
  | 'private_not_active'
  | 'public_active'
  | 'public_not_active'

export function mapEditorIdolStatusToGraphQlType(idolStatus: idolStatus) {
  switch (idolStatus) {
    case 'private_active':
      return IdolStatus.PrivateActive
    case 'private_not_active':
      return IdolStatus.PrivateNotActive
    case 'public_active':
      return IdolStatus.PublicActive
    case 'public_not_active':
      return IdolStatus.PublicNotActive
  }
}

export function GraphQlTypeToEditorIdolStatus(
  idolStatus: Omit<IdolStatus, IdolStatus.OperationDeleted>
) {
  switch (idolStatus) {
    case IdolStatus.PrivateActive:
      return 'private_active'
    case IdolStatus.PrivateNotActive:
      return 'private_not_active'
    case IdolStatus.PublicActive:
      return 'public_active'
    case IdolStatus.PublicNotActive:
      return 'public_not_active'
    default:
      throw new Error(`${idolStatus} is not a valid status for editor`)
  }
}
