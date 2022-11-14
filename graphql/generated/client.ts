import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type AddAdminUserParamsInput = {
  email: Scalars['String']
  name: Scalars['String']
  password: Scalars['String']
}

export type AddOrUpdateChekiParamsInput = {
  chekiQuantity: Scalars['Int']
  chekiShotAt: Scalars['String']
  idolId: Scalars['ID']
  regulationId?: InputMaybe<Scalars['ID']>
}

export type AddOrUpdateGroupParamsInput = {
  groupName: Scalars['String']
  groupStatus: GroupStatus
}

export type AddOrUpdateIdolParamsInput = {
  idolName: Scalars['String']
  idolStatus: IdolStatus
}

export type AddOrUpdateRegulationParamsInput = {
  groupId: Scalars['ID']
  regulationComment: Scalars['String']
  regulationName: Scalars['String']
  regulationStatus: RegulationStatus
  regulationUnitPrice: Scalars['Int']
}

export type AdminMutationServices = {
  __typename?: 'AdminMutationServices'
  adminUser: AdminUserMutationService
}

export type AdminQueryServices = {
  __typename?: 'AdminQueryServices'
  adminUserAuth: AdminUserAuthQueryService
  adminUsers: AdminUsersQueryService
}

export type AdminUserAuthMutationService = {
  __typename?: 'AdminUserAuthMutationService'
  adminUserLogin: AdminUserSerializer
  adminUserLogout: Scalars['String']
}

export type AdminUserAuthMutationServiceAdminUserLoginArgs = {
  params: AdminUserLoginParamsInput
}

export type AdminUserAuthQueryService = {
  __typename?: 'AdminUserAuthQueryService'
  currentAuthAdminUser: AdminUserSerializer
}

export type AdminUserLoginParamsInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type AdminUserMutationService = {
  __typename?: 'AdminUserMutationService'
  addAdminUser: AdminUserSerializer
  updateAdminUser: AdminUserSerializer
  updateAdminUserPassword: AdminUserSerializer
}

export type AdminUserMutationServiceAddAdminUserArgs = {
  params: AddAdminUserParamsInput
}

export type AdminUserMutationServiceUpdateAdminUserArgs = {
  adminUserId: Scalars['ID']
  params: UpdateAdminUserParamsInput
}

export type AdminUserMutationServiceUpdateAdminUserPasswordArgs = {
  adminUserId: Scalars['ID']
  params: UpdateAdminUserPasswordParamsInput
}

export type AdminUserPaginationSerializer = PaginationSerializer & {
  __typename?: 'AdminUserPaginationSerializer'
  adminUsers: Array<AdminUserSerializer>
  count: Scalars['Int']
  currentPage: Scalars['Int']
  pageCount: Scalars['Int']
}

export type AdminUserSerializer = {
  __typename?: 'AdminUserSerializer'
  adminUserCreatedAt: Scalars['String']
  adminUserEmail: Scalars['String']
  adminUserId: Scalars['ID']
  adminUserName: Scalars['String']
  adminUserUpdatedAt: Scalars['String']
}

export type AdminUsersQueryService = {
  __typename?: 'AdminUsersQueryService'
  getAdminUser?: Maybe<AdminUserSerializer>
  getAdminUserList: AdminUserPaginationSerializer
}

export type AdminUsersQueryServiceGetAdminUserArgs = {
  adminUserID: Scalars['ID']
}

export type AdminUsersQueryServiceGetAdminUserListArgs = {
  page: Scalars['Int']
}

export type ChekiIdolCountSerializer = {
  __typename?: 'ChekiIdolCountSerializer'
  chekiCount: Scalars['Int']
  idol?: Maybe<IdolSerializer>
  idolId: Scalars['ID']
}

export type ChekiMonthIdolCountSerializer = {
  __typename?: 'ChekiMonthIdolCountSerializer'
  chekiCount: Scalars['Int']
  chekiShotAtMonth: ChekiShotAtMonthSerializer
  idol?: Maybe<IdolSerializer>
  idolId: Scalars['ID']
}

export type ChekiMutationServices = {
  __typename?: 'ChekiMutationServices'
  addCheki: ChekiSerializer
  deleteCheki: Scalars['String']
  updateCheki: ChekiSerializer
}

export type ChekiMutationServicesAddChekiArgs = {
  params: AddOrUpdateChekiParamsInput
}

export type ChekiMutationServicesDeleteChekiArgs = {
  chekiId: Scalars['ID']
}

export type ChekiMutationServicesUpdateChekiArgs = {
  chekiId: Scalars['ID']
  params: AddOrUpdateChekiParamsInput
}

export type ChekiSerializer = {
  __typename?: 'ChekiSerializer'
  chekiCreatedAt: Scalars['String']
  chekiId: Scalars['ID']
  chekiQuantity: Scalars['Int']
  chekiShotAt: Scalars['String']
  chekiUpdatedAt: Scalars['String']
  idol?: Maybe<IdolSerializer>
  idolId?: Maybe<Scalars['ID']>
  regulation?: Maybe<RegulationSerializer>
  regulationId?: Maybe<Scalars['ID']>
  user?: Maybe<LimitedUserSerializer>
  userId: Scalars['ID']
}

export type ChekiShotAtMonthSerializer = {
  __typename?: 'ChekiShotAtMonthSerializer'
  baseTimezone: Scalars['String']
  month: Scalars['Int']
  year: Scalars['Int']
}

export type CurrentUserGroups = {
  __typename?: 'CurrentUserGroups'
  getGroupsCreatedByUser: GroupPaginationSerializer
}

export type CurrentUserGroupsGetGroupsCreatedByUserArgs = {
  page: Scalars['Int']
}

export type CurrentUserIdols = {
  __typename?: 'CurrentUserIdols'
  getIdolsCreatedByUser: IdolPaginationSerializer
}

export type CurrentUserIdolsGetIdolsCreatedByUserArgs = {
  page: Scalars['Int']
}

export type FavoriteGroupMutationServices = {
  __typename?: 'FavoriteGroupMutationServices'
  addFavoriteGroup: FavoriteGroupSerializer
  deleteFavoriteGroup: Scalars['String']
}

export type FavoriteGroupMutationServicesAddFavoriteGroupArgs = {
  groupId: Scalars['ID']
}

export type FavoriteGroupMutationServicesDeleteFavoriteGroupArgs = {
  favoriteGroupID: Scalars['ID']
}

export type FavoriteGroupSerializer = {
  __typename?: 'FavoriteGroupSerializer'
  favoriteGroupId: Scalars['ID']
  group?: Maybe<GroupSerializer>
  groupId: Scalars['ID']
  user?: Maybe<LimitedUserSerializer>
  userId: Scalars['ID']
}

export type FavoriteGroupWithGroupSerializer = {
  __typename?: 'FavoriteGroupWithGroupSerializer'
  favoriteGroupId: Scalars['ID']
  group?: Maybe<GroupSerializer>
  groupId: Scalars['ID']
  user?: Maybe<LimitedUserSerializer>
  userId: Scalars['ID']
}

export type GetChekiMonthIdolCountParamsInput = {
  baseTimezone: Scalars['String']
}

export type GetUserChekiIdolCountParamsInput = {
  chekiShotAtEnd: Scalars['String']
  chekiShotAtStart: Scalars['String']
}

export type GetUserChekisParamsInput = {
  chekiShotAtEnd: Scalars['String']
  chekiShotAtStart: Scalars['String']
  idolId?: InputMaybe<Scalars['ID']>
}

export type GroupMutationServices = {
  __typename?: 'GroupMutationServices'
  addGroup: GroupSerializer
  addIdolToGroup: GroupSerializer
  deleteGroup: Scalars['String']
  removeIdolFromGroup: GroupSerializer
  updateGroup: GroupSerializer
}

export type GroupMutationServicesAddGroupArgs = {
  params: AddOrUpdateGroupParamsInput
}

export type GroupMutationServicesAddIdolToGroupArgs = {
  groupId: Scalars['ID']
  idolId: Scalars['ID']
}

export type GroupMutationServicesDeleteGroupArgs = {
  groupId: Scalars['ID']
}

export type GroupMutationServicesRemoveIdolFromGroupArgs = {
  groupId: Scalars['ID']
  idolId: Scalars['ID']
}

export type GroupMutationServicesUpdateGroupArgs = {
  groupId: Scalars['ID']
  params: AddOrUpdateGroupParamsInput
}

export type GroupPaginationSerializer = PaginationSerializer & {
  __typename?: 'GroupPaginationSerializer'
  count: Scalars['Int']
  currentPage: Scalars['Int']
  groups: Array<GroupSerializer>
  pageCount: Scalars['Int']
}

export type GroupSerializer = {
  __typename?: 'GroupSerializer'
  groupCreatedAt: Scalars['String']
  groupId: Scalars['ID']
  groupName: Scalars['String']
  groupStatus: Scalars['String']
  groupUpdatedAt: Scalars['String']
  user?: Maybe<LimitedUserSerializer>
  userId?: Maybe<Scalars['ID']>
}

export enum GroupStatus {
  OperationDeleted = 'OPERATION_DELETED',
  PrivateActive = 'PRIVATE_ACTIVE',
  PrivateNotActive = 'PRIVATE_NOT_ACTIVE',
  PublicActive = 'PUBLIC_ACTIVE',
  PublicNotActive = 'PUBLIC_NOT_ACTIVE',
}

export type IdolMutationServices = {
  __typename?: 'IdolMutationServices'
  addIdol: IdolSerializer
  deleteIdol: Scalars['String']
  updateIdol: IdolSerializer
}

export type IdolMutationServicesAddIdolArgs = {
  params: AddOrUpdateIdolParamsInput
}

export type IdolMutationServicesDeleteIdolArgs = {
  idolId: Scalars['ID']
}

export type IdolMutationServicesUpdateIdolArgs = {
  idolId: Scalars['ID']
  params: AddOrUpdateIdolParamsInput
}

export type IdolPaginationSerializer = PaginationSerializer & {
  __typename?: 'IdolPaginationSerializer'
  count: Scalars['Int']
  currentPage: Scalars['Int']
  idols: Array<IdolSerializer>
  pageCount: Scalars['Int']
}

export type IdolSerializer = {
  __typename?: 'IdolSerializer'
  idolCreatedAt: Scalars['String']
  idolId: Scalars['ID']
  idolName: Scalars['String']
  idolStatus: Scalars['String']
  idolUpdatedAt: Scalars['String']
  user?: Maybe<LimitedUserSerializer>
  userId?: Maybe<Scalars['ID']>
}

export enum IdolStatus {
  OperationDeleted = 'OPERATION_DELETED',
  PrivateActive = 'PRIVATE_ACTIVE',
  PrivateNotActive = 'PRIVATE_NOT_ACTIVE',
  PublicActive = 'PUBLIC_ACTIVE',
  PublicNotActive = 'PUBLIC_NOT_ACTIVE',
}

export type LimitedUserSerializer = {
  __typename?: 'LimitedUserSerializer'
  userId: Scalars['ID']
  userName: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  admin: AdminMutationServices
  adminUserAuth: AdminUserAuthMutationService
  cheki: ChekiMutationServices
  favoriteGroup: FavoriteGroupMutationServices
  group: GroupMutationServices
  idol: IdolMutationServices
  regulation: RegulationMutationServices
  user: UserMutationServices
}

export type PaginationSerializer = {
  count: Scalars['Int']
  currentPage: Scalars['Int']
  pageCount: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
  admin: AdminQueryServices
  currentUser?: Maybe<UserSerializer>
  currentUserChekis: UserChekis
  currentUserGroups: CurrentUserGroups
  currentUserIdols: CurrentUserIdols
  getAllIdols: IdolPaginationSerializer
  getCheki: ChekiSerializer
  getCsrfToken: Scalars['String']
  getGroup: GroupSerializer
  getIdol: IdolSerializer
  getRegulation: RegulationSerializer
  userFavoriteGroups: UserFavoriteGroup
}

export type QueryGetAllIdolsArgs = {
  page: Scalars['Int']
}

export type QueryGetChekiArgs = {
  chekiId: Scalars['ID']
}

export type QueryGetGroupArgs = {
  groupId: Scalars['ID']
}

export type QueryGetIdolArgs = {
  idolId: Scalars['ID']
}

export type QueryGetRegulationArgs = {
  regulationId: Scalars['ID']
}

export type RegulationMutationServices = {
  __typename?: 'RegulationMutationServices'
  addRegulation: RegulationSerializer
  deleteRegulation: Scalars['String']
  updateRegulation: RegulationSerializer
}

export type RegulationMutationServicesAddRegulationArgs = {
  params: AddOrUpdateRegulationParamsInput
}

export type RegulationMutationServicesDeleteRegulationArgs = {
  regulationId: Scalars['ID']
}

export type RegulationMutationServicesUpdateRegulationArgs = {
  params: AddOrUpdateRegulationParamsInput
  regulationId: Scalars['ID']
}

export type RegulationSerializer = {
  __typename?: 'RegulationSerializer'
  group?: Maybe<GroupSerializer>
  groupId: Scalars['ID']
  regulationComment: Scalars['String']
  regulationCreatedAt: Scalars['String']
  regulationId: Scalars['ID']
  regulationName: Scalars['String']
  regulationStatus: Scalars['String']
  regulationUnitPrice: Scalars['Int']
  regulationUpdatedAt: Scalars['String']
  user?: Maybe<LimitedUserSerializer>
  userId?: Maybe<Scalars['ID']>
}

export enum RegulationStatus {
  Active = 'ACTIVE',
  NotActive = 'NOT_ACTIVE',
  OperationDeleted = 'OPERATION_DELETED',
}

export type UpdateAdminUserParamsInput = {
  email: Scalars['String']
  name: Scalars['String']
}

export type UpdateAdminUserPasswordParamsInput = {
  password: Scalars['String']
}

export type UserChekis = {
  __typename?: 'UserChekis'
  getChekiMonthIdolCount: Array<ChekiMonthIdolCountSerializer>
  getUserChekiIdolCount: Array<ChekiIdolCountSerializer>
  getUserChekis: Array<ChekiSerializer>
}

export type UserChekisGetChekiMonthIdolCountArgs = {
  params: GetChekiMonthIdolCountParamsInput
}

export type UserChekisGetUserChekiIdolCountArgs = {
  params: GetUserChekiIdolCountParamsInput
}

export type UserChekisGetUserChekisArgs = {
  params: GetUserChekisParamsInput
}

export type UserCreateParamsInput = {
  email: Scalars['String']
  name: Scalars['String']
  password: Scalars['String']
}

export type UserFavoriteGroup = {
  __typename?: 'UserFavoriteGroup'
  favoriteGroups: Array<FavoriteGroupWithGroupSerializer>
}

export type UserLoginParamsInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type UserMutationServices = {
  __typename?: 'UserMutationServices'
  userCreate: UserSerializer
  userLogin: UserSerializer
  userLogout: Scalars['String']
}

export type UserMutationServicesUserCreateArgs = {
  params: UserCreateParamsInput
}

export type UserMutationServicesUserLoginArgs = {
  params: UserLoginParamsInput
}

export type UserSerializer = {
  __typename?: 'UserSerializer'
  userCreatedAt: Scalars['String']
  userEmail?: Maybe<Scalars['String']>
  userEmailVerifiedAt?: Maybe<Scalars['String']>
  userId: Scalars['ID']
  userName: Scalars['String']
  userUpdatedAt: Scalars['String']
}

export type GetCsrfTokenQueryVariables = Exact<{ [key: string]: never }>

export type GetCsrfTokenQuery = { __typename?: 'Query'; getCsrfToken: string }

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type GetCurrentUserQuery = {
  __typename?: 'Query'
  currentUser?: {
    __typename?: 'UserSerializer'
    userCreatedAt: string
    userEmail?: string | null
    userEmailVerifiedAt?: string | null
    userId: string
    userName: string
    userUpdatedAt: string
  } | null
}

export type GetUserChekiIdolCountQueryVariables = Exact<{
  chekiShotAtStart: Scalars['String']
  chekiShotAtEnd: Scalars['String']
}>

export type GetUserChekiIdolCountQuery = {
  __typename?: 'Query'
  currentUserChekis: {
    __typename?: 'UserChekis'
    getUserChekiIdolCount: Array<{
      __typename?: 'ChekiIdolCountSerializer'
      chekiCount: number
      idol?: {
        __typename?: 'IdolSerializer'
        idolId: string
        idolName: string
      } | null
    }>
  }
}

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
        idol {
          idolId
          idolName
        }
      }
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    GetCSRFToken(
      variables?: GetCsrfTokenQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetCsrfTokenQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetCsrfTokenQuery>(GetCsrfTokenDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetCSRFToken',
        'query'
      )
    },
    GetCurrentUser(
      variables?: GetCurrentUserQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetCurrentUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetCurrentUserQuery>(
            GetCurrentUserDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'GetCurrentUser',
        'query'
      )
    },
    GetUserChekiIdolCount(
      variables: GetUserChekiIdolCountQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetUserChekiIdolCountQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserChekiIdolCountQuery>(
            GetUserChekiIdolCountDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'GetUserChekiIdolCount',
        'query'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
