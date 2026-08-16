/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
import { GraphQLClient, type RequestOptions } from 'graphql-request'
import gql from 'graphql-tag'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type AddOrUpdateChekiParamsInput = {
  chekiQuantity: number
  chekiShotAt: string
  idolId: string | number
  regulationId?: string | number | null | undefined
}

export type AddOrUpdateGroupParamsInput = {
  groupName: string
  groupStatus: GroupStatus
}

export type AddOrUpdateIdolParamsInput = {
  idolName: string
  idolStatus: IdolStatus
}

export type AddOrUpdateRegulationParamsInput = {
  groupId: string | number
  regulationComment: string
  regulationName: string
  regulationStatus: RegulationStatus
  regulationUnitPrice: number
}

export type GetChekiMonthCountByIdolParamsInput = {
  baseTimezone: string
  idolId: string | number
}

export enum GroupStatus {
  OperationDeleted = 'OPERATION_DELETED',
  PrivateActive = 'PRIVATE_ACTIVE',
  PrivateNotActive = 'PRIVATE_NOT_ACTIVE',
  PublicActive = 'PUBLIC_ACTIVE',
  PublicNotActive = 'PUBLIC_NOT_ACTIVE',
}

export enum IdolStatus {
  OperationDeleted = 'OPERATION_DELETED',
  PrivateActive = 'PRIVATE_ACTIVE',
  PrivateNotActive = 'PRIVATE_NOT_ACTIVE',
  PublicActive = 'PUBLIC_ACTIVE',
  PublicNotActive = 'PUBLIC_NOT_ACTIVE',
}

export enum RegulationStatus {
  Active = 'ACTIVE',
  NotActive = 'NOT_ACTIVE',
  OperationDeleted = 'OPERATION_DELETED',
}

export type SendAuth0PasswordResetEmailParamsInput = {
  auth0EmailAddress: string
}

export type UpdateUserNameParamsInput = {
  userName: string
}

export type AddChekiMutationVariables = Exact<{
  cheki: AddOrUpdateChekiParamsInput
}>

export type AddChekiMutation = { cheki: { addCheki: { chekiId: string } } }

export type AddGroupMutationVariables = Exact<{
  group: AddOrUpdateGroupParamsInput
}>

export type AddGroupMutation = {
  group: {
    addGroup: {
      groupCreatedAt: string
      groupId: string
      groupName: string
      groupStatus: GroupStatus
      groupUpdatedAt: string
      userId: string | null
      user: { userId: string; userName: string } | null
      regulations: Array<{
        regulationComment: string
        regulationCreatedAt: string
        regulationId: string
        regulationName: string
        regulationStatus: RegulationStatus
        regulationUnitPrice: number
        regulationUpdatedAt: string
      }>
      idols: Array<{
        idolCreatedAt: string
        idolId: string
        idolName: string
        idolStatus: IdolStatus
        idolUpdatedAt: string
        userId: string | null
        user: { userId: string; userName: string } | null
        groups: Array<{ groupId: string; groupName: string } | null>
      } | null>
    }
  }
}

export type AddIdolMutationVariables = Exact<{
  idol: AddOrUpdateIdolParamsInput
}>

export type AddIdolMutation = {
  idol: {
    addIdol: {
      idolCreatedAt: string
      idolId: string
      idolName: string
      idolStatus: IdolStatus
      idolUpdatedAt: string
      user: { userId: string; userName: string } | null
    }
  }
}

export type AddIdolToGroupMutationVariables = Exact<{
  groupId: string | number
  idolId: string | number
}>

export type AddIdolToGroupMutation = {
  group: { addIdolToGroup: { groupId: string } }
}

export type AddRegulationToGroupMutationVariables = Exact<{
  regulation: AddOrUpdateRegulationParamsInput
}>

export type AddRegulationToGroupMutation = {
  regulation: { addRegulation: { regulationId: string } }
}

export type DeleteChekiMutationVariables = Exact<{
  chekiId: string | number
}>

export type DeleteChekiMutation = { cheki: { deleteCheki: string } }

export type DeleteGroupMutationVariables = Exact<{
  groupId: string | number
}>

export type DeleteGroupMutation = { group: { deleteGroup: string } }

export type DeleteIdolMutationVariables = Exact<{
  id: string | number
}>

export type DeleteIdolMutation = { idol: { deleteIdol: string } }

export type DeleteRegulationMutationVariables = Exact<{
  regulationId: string | number
}>

export type DeleteRegulationMutation = {
  regulation: { deleteRegulation: string }
}

export type EditGroupMutationVariables = Exact<{
  groupId: string | number
  group: AddOrUpdateGroupParamsInput
}>

export type EditGroupMutation = {
  group: {
    updateGroup: {
      groupCreatedAt: string
      groupId: string
      groupName: string
      groupStatus: GroupStatus
      groupUpdatedAt: string
      userId: string | null
      user: { userId: string; userName: string } | null
      regulations: Array<{
        regulationComment: string
        regulationCreatedAt: string
        regulationId: string
        regulationName: string
        regulationStatus: RegulationStatus
        regulationUnitPrice: number
        regulationUpdatedAt: string
      }>
      idols: Array<{
        idolCreatedAt: string
        idolId: string
        idolName: string
        idolStatus: IdolStatus
        idolUpdatedAt: string
        userId: string | null
        user: { userId: string; userName: string } | null
        groups: Array<{ groupId: string; groupName: string } | null>
      } | null>
    }
  }
}

export type EditIdolMutationVariables = Exact<{
  idolId: string | number
  idol: AddOrUpdateIdolParamsInput
}>

export type EditIdolMutation = {
  idol: {
    updateIdol: {
      idolCreatedAt: string
      idolId: string
      idolName: string
      idolStatus: IdolStatus
      idolUpdatedAt: string
      userId: string | null
      groups: Array<{ groupName: string; groupId: string } | null>
      user: { userId: string; userName: string } | null
    }
  }
}

export type GetChekiMonthCountByIdolQueryVariables = Exact<{
  params: GetChekiMonthCountByIdolParamsInput
}>

export type GetChekiMonthCountByIdolQuery = {
  currentUserChekis: {
    getChekiMonthCountByIdol: Array<{
      count: number
      month: { baseTimezone: string; month: number; year: number }
    }>
  }
}

export type GetChekiMonthIdolCountQueryVariables = Exact<{
  baseTimezone: string
}>

export type GetChekiMonthIdolCountQuery = {
  currentUserChekis: {
    getChekiMonthIdolCount: Array<{
      chekiCount: number
      idolId: string
      chekiShotAtMonth: { baseTimezone: string; year: number; month: number }
      idol: { idolName: string } | null
    }>
  }
}

export type GetCsrfTokenQueryVariables = Exact<{ [key: string]: never }>

export type GetCsrfTokenQuery = { getCsrfToken: string }

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type GetCurrentUserQuery = {
  currentUser: {
    userCreatedAt: string
    userEmail: string | null
    userEmailVerifiedAt: string | null
    userId: string
    userName: string
    userUpdatedAt: string
  } | null
}

export type GetGroupQueryVariables = Exact<{
  groupId: string | number
}>

export type GetGroupQuery = {
  getGroup: {
    groupCreatedAt: string
    groupId: string
    groupName: string
    groupStatus: GroupStatus
    groupUpdatedAt: string
    userId: string | null
    user: { userId: string; userName: string } | null
    regulations: Array<{
      regulationComment: string
      regulationCreatedAt: string
      regulationId: string
      regulationName: string
      regulationStatus: RegulationStatus
      regulationUnitPrice: number
      regulationUpdatedAt: string
      groupId: string
    }>
    idols: Array<{
      idolCreatedAt: string
      idolId: string
      idolName: string
      idolStatus: IdolStatus
      idolUpdatedAt: string
      userId: string | null
      user: { userId: string; userName: string } | null
      groups: Array<{ groupId: string; groupName: string } | null>
    } | null>
  }
}

export type GetIdolQueryVariables = Exact<{
  idolId: string | number
}>

export type GetIdolQuery = {
  getIdol: {
    idolCreatedAt: string
    idolId: string
    idolName: string
    idolStatus: IdolStatus
    idolUpdatedAt: string
    userId: string | null
    groups: Array<{ groupName: string; groupId: string } | null>
    user: { userId: string; userName: string } | null
  }
}

export type GetIdolChekisByDateRangeAndIdolIdQueryVariables = Exact<{
  chekiShotAtStart: string
  chekiShotAtEnd: string
  idolId: string | number
}>

export type GetIdolChekisByDateRangeAndIdolIdQuery = {
  currentUserChekis: {
    getUserChekis: Array<{
      chekiCreatedAt: string
      chekiId: string
      chekiQuantity: number
      chekiShotAt: string
      chekiUpdatedAt: string
      idolId: string | null
      regulationId: string | null
      userId: string
      regulation: {
        groupId: string
        regulationComment: string
        regulationCreatedAt: string
        regulationId: string
        regulationName: string
        regulationStatus: RegulationStatus
        regulationUnitPrice: number
        regulationUpdatedAt: string
        userId: string | null
        group: {
          groupCreatedAt: string
          groupId: string
          groupName: string
          groupStatus: GroupStatus
          groupUpdatedAt: string
        } | null
      } | null
    }>
  }
}

export type GetIdolDetailsForChekiAddQueryVariables = Exact<{
  idolId: string | number
}>

export type GetIdolDetailsForChekiAddQuery = {
  getIdol: {
    idolCreatedAt: string
    idolId: string
    idolName: string
    idolStatus: IdolStatus
    idolUpdatedAt: string
    userId: string | null
    groups: Array<{
      groupName: string
      groupId: string
      regulations: Array<{
        regulationComment: string
        regulationCreatedAt: string
        regulationId: string
        regulationName: string
        regulationStatus: RegulationStatus
        regulationUnitPrice: number
        regulationUpdatedAt: string
      }>
    } | null>
    user: { userId: string; userName: string } | null
  }
}

export type GetRegulationQueryVariables = Exact<{
  regulationId: string | number
}>

export type GetRegulationQuery = {
  getRegulation: {
    groupId: string
    regulationComment: string
    regulationCreatedAt: string
    regulationId: string
    regulationName: string
    regulationStatus: RegulationStatus
    regulationUnitPrice: number
    regulationUpdatedAt: string
    userId: string | null
  }
}

export type GetUserAllChekisQueryVariables = Exact<{
  page: number
}>

export type GetUserAllChekisQuery = {
  currentUserChekis: {
    getUserAllChekis: {
      count: number
      currentPage: number
      pageCount: number
      chekis: Array<{
        chekiCreatedAt: string
        chekiId: string
        chekiQuantity: number
        chekiShotAt: string
        chekiUpdatedAt: string
        idolId: string | null
        regulationId: string | null
        userId: string
        regulation: {
          groupId: string
          regulationComment: string
          regulationCreatedAt: string
          regulationId: string
          regulationName: string
          regulationStatus: RegulationStatus
          regulationUnitPrice: number
          regulationUpdatedAt: string
          userId: string | null
          group: {
            groupCreatedAt: string
            groupId: string
            groupName: string
            groupStatus: GroupStatus
            groupUpdatedAt: string
          } | null
        } | null
        idol: {
          idolId: string
          idolName: string
          idolStatus: IdolStatus
          idolCreatedAt: string
          idolUpdatedAt: string
        } | null
      }>
    }
  }
}

export type GetUserChekiIdolCountQueryVariables = Exact<{
  chekiShotAtStart: string
  chekiShotAtEnd: string
}>

export type GetUserChekiIdolCountQuery = {
  currentUserChekis: {
    getUserChekiIdolCount: Array<{
      chekiCount: number
      totalPrice: number
      idol: { idolId: string; idolName: string } | null
    }>
  }
}

export type GetUserCreatedGroupListQueryVariables = Exact<{
  page: number
}>

export type GetUserCreatedGroupListQuery = {
  currentUserGroups: {
    getGroupsCreatedByUser: {
      count: number
      currentPage: number
      pageCount: number
      groups: Array<{
        groupCreatedAt: string
        groupId: string
        groupName: string
        groupStatus: GroupStatus
        groupUpdatedAt: string
        userId: string | null
        user: { userId: string; userName: string } | null
      }>
    }
  }
}

export type GetUserCreatedGroupListWithIdolsQueryVariables = Exact<{
  page: number
}>

export type GetUserCreatedGroupListWithIdolsQuery = {
  currentUserGroups: {
    getGroupsCreatedByUser: {
      count: number
      currentPage: number
      pageCount: number
      groups: Array<{
        groupCreatedAt: string
        groupId: string
        groupName: string
        groupStatus: GroupStatus
        groupUpdatedAt: string
        userId: string | null
        user: { userId: string; userName: string } | null
        idols: Array<{
          idolId: string
          idolName: string
          idolStatus: IdolStatus
          groups: Array<{ groupName: string; groupId: string } | null>
        } | null>
      }>
    }
  }
}

export type GetUserCreatedIdolListQueryVariables = Exact<{
  page: number
}>

export type GetUserCreatedIdolListQuery = {
  currentUserIdols: {
    getIdolsCreatedByUser: {
      count: number
      currentPage: number
      pageCount: number
      idols: Array<{
        idolName: string
        idolId: string
        idolStatus: IdolStatus
        userId: string | null
        idolUpdatedAt: string
        idolCreatedAt: string
        groups: Array<{ groupName: string; groupId: string } | null>
      }>
    }
  }
}

export type RemoveIdolFromGroupMutationVariables = Exact<{
  groupId: string | number
  idolId: string | number
}>

export type RemoveIdolFromGroupMutation = {
  group: { removeIdolFromGroup: { groupId: string } }
}

export type ResetAuth0UserPasswordMutationVariables = Exact<{
  params: SendAuth0PasswordResetEmailParamsInput
}>

export type ResetAuth0UserPasswordMutation = {
  user: { sendAuth0PasswordResetEmail: string }
}

export type UpdateRegulationMutationVariables = Exact<{
  regulationId: string | number
  regulation: AddOrUpdateRegulationParamsInput
}>

export type UpdateRegulationMutation = {
  regulation: { updateRegulation: { regulationId: string } }
}

export type UpdateUserNameMutationVariables = Exact<{
  params: UpdateUserNameParamsInput
}>

export type UpdateUserNameMutation = { user: { updateUserName: string } }

export const AddChekiDocument = gql`
  mutation AddCheki($cheki: AddOrUpdateChekiParamsInput!) {
    cheki {
      addCheki(params: $cheki) {
        chekiId
      }
    }
  }
`
export const AddGroupDocument = gql`
  mutation AddGroup($group: AddOrUpdateGroupParamsInput!) {
    group {
      addGroup(params: $group) {
        groupCreatedAt
        groupId
        groupName
        groupStatus
        groupUpdatedAt
        userId
        user {
          userId
          userName
        }
        regulations {
          regulationComment
          regulationCreatedAt
          regulationId
          regulationName
          regulationStatus
          regulationUnitPrice
          regulationUpdatedAt
        }
        idols {
          idolCreatedAt
          idolId
          idolName
          idolStatus
          idolUpdatedAt
          user {
            userId
            userName
          }
          groups {
            groupId
            groupName
          }
          userId
        }
      }
    }
  }
`
export const AddIdolDocument = gql`
  mutation AddIdol($idol: AddOrUpdateIdolParamsInput!) {
    idol {
      addIdol(params: $idol) {
        idolCreatedAt
        idolId
        idolName
        idolStatus
        idolUpdatedAt
        user {
          userId
          userName
        }
      }
    }
  }
`
export const AddIdolToGroupDocument = gql`
  mutation AddIdolToGroup($groupId: ID!, $idolId: ID!) {
    group {
      addIdolToGroup(groupId: $groupId, idolId: $idolId) {
        groupId
      }
    }
  }
`
export const AddRegulationToGroupDocument = gql`
  mutation AddRegulationToGroup(
    $regulation: AddOrUpdateRegulationParamsInput!
  ) {
    regulation {
      addRegulation(params: $regulation) {
        regulationId
      }
    }
  }
`
export const DeleteChekiDocument = gql`
  mutation DeleteCheki($chekiId: ID!) {
    cheki {
      deleteCheki(chekiId: $chekiId)
    }
  }
`
export const DeleteGroupDocument = gql`
  mutation DeleteGroup($groupId: ID!) {
    group {
      deleteGroup(groupId: $groupId)
    }
  }
`
export const DeleteIdolDocument = gql`
  mutation DeleteIdol($id: ID!) {
    idol {
      deleteIdol(idolId: $id)
    }
  }
`
export const DeleteRegulationDocument = gql`
  mutation DeleteRegulation($regulationId: ID!) {
    regulation {
      deleteRegulation(regulationId: $regulationId)
    }
  }
`
export const EditGroupDocument = gql`
  mutation EditGroup($groupId: ID!, $group: AddOrUpdateGroupParamsInput!) {
    group {
      updateGroup(groupId: $groupId, params: $group) {
        groupCreatedAt
        groupId
        groupName
        groupStatus
        groupUpdatedAt
        userId
        user {
          userId
          userName
        }
        regulations {
          regulationComment
          regulationCreatedAt
          regulationId
          regulationName
          regulationStatus
          regulationUnitPrice
          regulationUpdatedAt
        }
        idols {
          idolCreatedAt
          idolId
          idolName
          idolStatus
          idolUpdatedAt
          user {
            userId
            userName
          }
          groups {
            groupId
            groupName
          }
          userId
        }
      }
    }
  }
`
export const EditIdolDocument = gql`
  mutation EditIdol($idolId: ID!, $idol: AddOrUpdateIdolParamsInput!) {
    idol {
      updateIdol(idolId: $idolId, params: $idol) {
        idolCreatedAt
        idolId
        idolName
        idolStatus
        idolUpdatedAt
        userId
        groups {
          groupName
          groupId
        }
        user {
          userId
          userName
        }
      }
    }
  }
`
export const GetChekiMonthCountByIdolDocument = gql`
  query getChekiMonthCountByIdol(
    $params: GetChekiMonthCountByIdolParamsInput!
  ) {
    currentUserChekis {
      getChekiMonthCountByIdol(params: $params) {
        count
        month {
          baseTimezone
          month
          year
        }
      }
    }
  }
`
export const GetChekiMonthIdolCountDocument = gql`
  query GetChekiMonthIdolCount($baseTimezone: String!) {
    currentUserChekis {
      getChekiMonthIdolCount(params: { baseTimezone: $baseTimezone }) {
        chekiCount
        chekiShotAtMonth {
          baseTimezone
          year
          month
        }
        idolId
        idol {
          idolName
        }
      }
    }
  }
`
export const GetCsrfTokenDocument = gql`
  query GetCSRFToken {
    getCsrfToken
  }
`
export const GetCurrentUserDocument = gql`
  query GetCurrentUser {
    currentUser {
      userCreatedAt
      userEmail
      userEmailVerifiedAt
      userId
      userName
      userUpdatedAt
    }
  }
`
export const GetGroupDocument = gql`
  query GetGroup($groupId: ID!) {
    getGroup(groupId: $groupId) {
      groupCreatedAt
      groupId
      groupName
      groupStatus
      groupUpdatedAt
      userId
      user {
        userId
        userName
      }
      regulations {
        regulationComment
        regulationCreatedAt
        regulationId
        regulationName
        regulationStatus
        regulationUnitPrice
        regulationUpdatedAt
        groupId
      }
      idols {
        idolCreatedAt
        idolId
        idolName
        idolStatus
        idolUpdatedAt
        user {
          userId
          userName
        }
        groups {
          groupId
          groupName
        }
        userId
      }
    }
  }
`
export const GetIdolDocument = gql`
  query GetIdol($idolId: ID!) {
    getIdol(idolId: $idolId) {
      idolCreatedAt
      idolId
      idolName
      idolStatus
      idolUpdatedAt
      userId
      groups {
        groupName
        groupId
      }
      user {
        userId
        userName
      }
    }
  }
`
export const GetIdolChekisByDateRangeAndIdolIdDocument = gql`
  query GetIdolChekisByDateRangeAndIdolId(
    $chekiShotAtStart: String!
    $chekiShotAtEnd: String!
    $idolId: ID!
  ) {
    currentUserChekis {
      getUserChekis(
        params: {
          chekiShotAtStart: $chekiShotAtStart
          chekiShotAtEnd: $chekiShotAtEnd
          idolId: $idolId
        }
      ) {
        chekiCreatedAt
        chekiId
        chekiQuantity
        chekiShotAt
        chekiUpdatedAt
        idolId
        regulationId
        userId
        regulation {
          groupId
          regulationComment
          regulationCreatedAt
          regulationId
          regulationName
          regulationStatus
          regulationUnitPrice
          regulationUpdatedAt
          userId
          group {
            groupCreatedAt
            groupId
            groupName
            groupStatus
            groupUpdatedAt
          }
        }
      }
    }
  }
`
export const GetIdolDetailsForChekiAddDocument = gql`
  query GetIdolDetailsForChekiAdd($idolId: ID!) {
    getIdol(idolId: $idolId) {
      idolCreatedAt
      idolId
      idolName
      idolStatus
      idolUpdatedAt
      userId
      groups {
        groupName
        groupId
        regulations {
          regulationComment
          regulationCreatedAt
          regulationId
          regulationName
          regulationStatus
          regulationUnitPrice
          regulationUpdatedAt
        }
      }
      user {
        userId
        userName
      }
    }
  }
`
export const GetRegulationDocument = gql`
  query GetRegulation($regulationId: ID!) {
    getRegulation(regulationId: $regulationId) {
      groupId
      regulationComment
      regulationCreatedAt
      regulationId
      regulationName
      regulationStatus
      regulationUnitPrice
      regulationUpdatedAt
      userId
    }
  }
`
export const GetUserAllChekisDocument = gql`
  query GetUserAllChekis($page: Int!) {
    currentUserChekis {
      getUserAllChekis(page: $page) {
        chekis {
          chekiCreatedAt
          chekiId
          chekiQuantity
          chekiShotAt
          chekiUpdatedAt
          idolId
          regulationId
          userId
          regulation {
            groupId
            regulationComment
            regulationCreatedAt
            regulationId
            regulationName
            regulationStatus
            regulationUnitPrice
            regulationUpdatedAt
            userId
            group {
              groupCreatedAt
              groupId
              groupName
              groupStatus
              groupUpdatedAt
            }
          }
          idol {
            idolId
            idolName
            idolStatus
            idolCreatedAt
            idolUpdatedAt
          }
        }
        count
        currentPage
        pageCount
      }
    }
  }
`
export const GetUserChekiIdolCountDocument = gql`
  query GetUserChekiIdolCount(
    $chekiShotAtStart: String!
    $chekiShotAtEnd: String!
  ) {
    currentUserChekis {
      getUserChekiIdolCount(
        params: {
          chekiShotAtStart: $chekiShotAtStart
          chekiShotAtEnd: $chekiShotAtEnd
        }
      ) {
        chekiCount
        totalPrice
        idol {
          idolId
          idolName
        }
      }
    }
  }
`
export const GetUserCreatedGroupListDocument = gql`
  query GetUserCreatedGroupList($page: Int!) {
    currentUserGroups {
      getGroupsCreatedByUser(page: $page) {
        count
        currentPage
        groups {
          groupCreatedAt
          groupId
          groupName
          groupStatus
          groupUpdatedAt
          userId
          user {
            userId
            userName
          }
        }
        pageCount
      }
    }
  }
`
export const GetUserCreatedGroupListWithIdolsDocument = gql`
  query GetUserCreatedGroupListWithIdols($page: Int!) {
    currentUserGroups {
      getGroupsCreatedByUser(page: $page) {
        count
        currentPage
        groups {
          groupCreatedAt
          groupId
          groupName
          groupStatus
          groupUpdatedAt
          userId
          user {
            userId
            userName
          }
          idols {
            idolId
            idolName
            idolStatus
            groups {
              groupName
              groupId
            }
          }
        }
        pageCount
      }
    }
  }
`
export const GetUserCreatedIdolListDocument = gql`
  query GetUserCreatedIdolList($page: Int!) {
    currentUserIdols {
      getIdolsCreatedByUser(page: $page) {
        count
        currentPage
        pageCount
        idols {
          idolName
          idolId
          idolStatus
          userId
          idolUpdatedAt
          idolCreatedAt
          groups {
            groupName
            groupId
          }
        }
      }
    }
  }
`
export const RemoveIdolFromGroupDocument = gql`
  mutation RemoveIdolFromGroup($groupId: ID!, $idolId: ID!) {
    group {
      removeIdolFromGroup(groupId: $groupId, idolId: $idolId) {
        groupId
      }
    }
  }
`
export const ResetAuth0UserPasswordDocument = gql`
  mutation ResetAuth0UserPassword(
    $params: SendAuth0PasswordResetEmailParamsInput!
  ) {
    user {
      sendAuth0PasswordResetEmail(params: $params)
    }
  }
`
export const UpdateRegulationDocument = gql`
  mutation UpdateRegulation(
    $regulationId: ID!
    $regulation: AddOrUpdateRegulationParamsInput!
  ) {
    regulation {
      updateRegulation(regulationId: $regulationId, params: $regulation) {
        regulationId
      }
    }
  }
`
export const UpdateUserNameDocument = gql`
  mutation UpdateUserName($params: UpdateUserNameParamsInput!) {
    user {
      updateUserName(params: $params)
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    AddCheki(
      variables: AddChekiMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<AddChekiMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddChekiMutation>({
            document: AddChekiDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'AddCheki',
        'mutation',
        variables,
      )
    },
    AddGroup(
      variables: AddGroupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<AddGroupMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddGroupMutation>({
            document: AddGroupDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'AddGroup',
        'mutation',
        variables,
      )
    },
    AddIdol(
      variables: AddIdolMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<AddIdolMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddIdolMutation>({
            document: AddIdolDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'AddIdol',
        'mutation',
        variables,
      )
    },
    AddIdolToGroup(
      variables: AddIdolToGroupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<AddIdolToGroupMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddIdolToGroupMutation>({
            document: AddIdolToGroupDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'AddIdolToGroup',
        'mutation',
        variables,
      )
    },
    AddRegulationToGroup(
      variables: AddRegulationToGroupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<AddRegulationToGroupMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddRegulationToGroupMutation>({
            document: AddRegulationToGroupDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'AddRegulationToGroup',
        'mutation',
        variables,
      )
    },
    DeleteCheki(
      variables: DeleteChekiMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<DeleteChekiMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteChekiMutation>({
            document: DeleteChekiDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'DeleteCheki',
        'mutation',
        variables,
      )
    },
    DeleteGroup(
      variables: DeleteGroupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<DeleteGroupMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteGroupMutation>({
            document: DeleteGroupDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'DeleteGroup',
        'mutation',
        variables,
      )
    },
    DeleteIdol(
      variables: DeleteIdolMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<DeleteIdolMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteIdolMutation>({
            document: DeleteIdolDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'DeleteIdol',
        'mutation',
        variables,
      )
    },
    DeleteRegulation(
      variables: DeleteRegulationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<DeleteRegulationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteRegulationMutation>({
            document: DeleteRegulationDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'DeleteRegulation',
        'mutation',
        variables,
      )
    },
    EditGroup(
      variables: EditGroupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<EditGroupMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EditGroupMutation>({
            document: EditGroupDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'EditGroup',
        'mutation',
        variables,
      )
    },
    EditIdol(
      variables: EditIdolMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<EditIdolMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EditIdolMutation>({
            document: EditIdolDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'EditIdol',
        'mutation',
        variables,
      )
    },
    getChekiMonthCountByIdol(
      variables: GetChekiMonthCountByIdolQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetChekiMonthCountByIdolQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetChekiMonthCountByIdolQuery>({
            document: GetChekiMonthCountByIdolDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'getChekiMonthCountByIdol',
        'query',
        variables,
      )
    },
    GetChekiMonthIdolCount(
      variables: GetChekiMonthIdolCountQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetChekiMonthIdolCountQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetChekiMonthIdolCountQuery>({
            document: GetChekiMonthIdolCountDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetChekiMonthIdolCount',
        'query',
        variables,
      )
    },
    GetCSRFToken(
      variables?: GetCsrfTokenQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetCsrfTokenQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetCsrfTokenQuery>({
            document: GetCsrfTokenDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetCSRFToken',
        'query',
        variables,
      )
    },
    GetCurrentUser(
      variables?: GetCurrentUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetCurrentUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetCurrentUserQuery>({
            document: GetCurrentUserDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetCurrentUser',
        'query',
        variables,
      )
    },
    GetGroup(
      variables: GetGroupQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetGroupQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetGroupQuery>({
            document: GetGroupDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetGroup',
        'query',
        variables,
      )
    },
    GetIdol(
      variables: GetIdolQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetIdolQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetIdolQuery>({
            document: GetIdolDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetIdol',
        'query',
        variables,
      )
    },
    GetIdolChekisByDateRangeAndIdolId(
      variables: GetIdolChekisByDateRangeAndIdolIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetIdolChekisByDateRangeAndIdolIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetIdolChekisByDateRangeAndIdolIdQuery>({
            document: GetIdolChekisByDateRangeAndIdolIdDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetIdolChekisByDateRangeAndIdolId',
        'query',
        variables,
      )
    },
    GetIdolDetailsForChekiAdd(
      variables: GetIdolDetailsForChekiAddQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetIdolDetailsForChekiAddQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetIdolDetailsForChekiAddQuery>({
            document: GetIdolDetailsForChekiAddDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetIdolDetailsForChekiAdd',
        'query',
        variables,
      )
    },
    GetRegulation(
      variables: GetRegulationQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetRegulationQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetRegulationQuery>({
            document: GetRegulationDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetRegulation',
        'query',
        variables,
      )
    },
    GetUserAllChekis(
      variables: GetUserAllChekisQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetUserAllChekisQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserAllChekisQuery>({
            document: GetUserAllChekisDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetUserAllChekis',
        'query',
        variables,
      )
    },
    GetUserChekiIdolCount(
      variables: GetUserChekiIdolCountQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetUserChekiIdolCountQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserChekiIdolCountQuery>({
            document: GetUserChekiIdolCountDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetUserChekiIdolCount',
        'query',
        variables,
      )
    },
    GetUserCreatedGroupList(
      variables: GetUserCreatedGroupListQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetUserCreatedGroupListQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserCreatedGroupListQuery>({
            document: GetUserCreatedGroupListDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetUserCreatedGroupList',
        'query',
        variables,
      )
    },
    GetUserCreatedGroupListWithIdols(
      variables: GetUserCreatedGroupListWithIdolsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetUserCreatedGroupListWithIdolsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserCreatedGroupListWithIdolsQuery>({
            document: GetUserCreatedGroupListWithIdolsDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetUserCreatedGroupListWithIdols',
        'query',
        variables,
      )
    },
    GetUserCreatedIdolList(
      variables: GetUserCreatedIdolListQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetUserCreatedIdolListQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserCreatedIdolListQuery>({
            document: GetUserCreatedIdolListDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetUserCreatedIdolList',
        'query',
        variables,
      )
    },
    RemoveIdolFromGroup(
      variables: RemoveIdolFromGroupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<RemoveIdolFromGroupMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RemoveIdolFromGroupMutation>({
            document: RemoveIdolFromGroupDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'RemoveIdolFromGroup',
        'mutation',
        variables,
      )
    },
    ResetAuth0UserPassword(
      variables: ResetAuth0UserPasswordMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<ResetAuth0UserPasswordMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ResetAuth0UserPasswordMutation>({
            document: ResetAuth0UserPasswordDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'ResetAuth0UserPassword',
        'mutation',
        variables,
      )
    },
    UpdateRegulation(
      variables: UpdateRegulationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<UpdateRegulationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateRegulationMutation>({
            document: UpdateRegulationDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'UpdateRegulation',
        'mutation',
        variables,
      )
    },
    UpdateUserName(
      variables: UpdateUserNameMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<UpdateUserNameMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateUserNameMutation>({
            document: UpdateUserNameDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'UpdateUserName',
        'mutation',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
