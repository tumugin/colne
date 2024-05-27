import { GraphQLClient, RequestOptions } from 'graphql-request'
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
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type AddAdminUserParamsInput = {
  email: Scalars['String']['input']
  name: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type AddOrUpdateChekiParamsInput = {
  chekiQuantity: Scalars['Int']['input']
  chekiShotAt: Scalars['String']['input']
  idolId: Scalars['ID']['input']
  regulationId?: InputMaybe<Scalars['ID']['input']>
}

export type AddOrUpdateGroupParamsInput = {
  groupName: Scalars['String']['input']
  groupStatus: GroupStatus
}

export type AddOrUpdateIdolParamsInput = {
  idolName: Scalars['String']['input']
  idolStatus: IdolStatus
}

export type AddOrUpdateRegulationParamsInput = {
  groupId: Scalars['ID']['input']
  regulationComment: Scalars['String']['input']
  regulationName: Scalars['String']['input']
  regulationStatus: RegulationStatus
  regulationUnitPrice: Scalars['Int']['input']
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
  adminUserLogout: Scalars['String']['output']
}

export type AdminUserAuthMutationServiceAdminUserLoginArgs = {
  params: AdminUserLoginParamsInput
}

export type AdminUserAuthQueryService = {
  __typename?: 'AdminUserAuthQueryService'
  currentAuthAdminUser: AdminUserSerializer
}

export type AdminUserLoginParamsInput = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
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
  adminUserId: Scalars['ID']['input']
  params: UpdateAdminUserParamsInput
}

export type AdminUserMutationServiceUpdateAdminUserPasswordArgs = {
  adminUserId: Scalars['ID']['input']
  params: UpdateAdminUserPasswordParamsInput
}

export type AdminUserPaginationSerializer = PaginationSerializer & {
  __typename?: 'AdminUserPaginationSerializer'
  adminUsers: Array<AdminUserSerializer>
  count: Scalars['Int']['output']
  currentPage: Scalars['Int']['output']
  pageCount: Scalars['Int']['output']
}

export type AdminUserSerializer = {
  __typename?: 'AdminUserSerializer'
  adminUserCreatedAt: Scalars['String']['output']
  adminUserEmail: Scalars['String']['output']
  adminUserId: Scalars['ID']['output']
  adminUserName: Scalars['String']['output']
  adminUserUpdatedAt: Scalars['String']['output']
}

export type AdminUsersQueryService = {
  __typename?: 'AdminUsersQueryService'
  getAdminUser?: Maybe<AdminUserSerializer>
  getAdminUserList: AdminUserPaginationSerializer
}

export type AdminUsersQueryServiceGetAdminUserArgs = {
  adminUserID: Scalars['ID']['input']
}

export type AdminUsersQueryServiceGetAdminUserListArgs = {
  page: Scalars['Int']['input']
}

export type ChekiIdolCountSerializer = {
  __typename?: 'ChekiIdolCountSerializer'
  chekiCount: Scalars['Int']['output']
  idol?: Maybe<IdolSerializer>
  idolId: Scalars['ID']['output']
  totalPrice: Scalars['Int']['output']
}

export type ChekiMonthIdolCountSerializer = {
  __typename?: 'ChekiMonthIdolCountSerializer'
  chekiCount: Scalars['Int']['output']
  chekiShotAtMonth: ChekiShotAtMonthSerializer
  idol?: Maybe<IdolSerializer>
  idolId: Scalars['ID']['output']
}

export type ChekiMutationServices = {
  __typename?: 'ChekiMutationServices'
  addCheki: ChekiSerializer
  deleteCheki: Scalars['String']['output']
  updateCheki: ChekiSerializer
}

export type ChekiMutationServicesAddChekiArgs = {
  params: AddOrUpdateChekiParamsInput
}

export type ChekiMutationServicesDeleteChekiArgs = {
  chekiId: Scalars['ID']['input']
}

export type ChekiMutationServicesUpdateChekiArgs = {
  chekiId: Scalars['ID']['input']
  params: AddOrUpdateChekiParamsInput
}

export type ChekiSerializer = {
  __typename?: 'ChekiSerializer'
  chekiCreatedAt: Scalars['String']['output']
  chekiId: Scalars['ID']['output']
  chekiQuantity: Scalars['Int']['output']
  chekiShotAt: Scalars['String']['output']
  chekiUpdatedAt: Scalars['String']['output']
  idol?: Maybe<IdolSerializer>
  idolId?: Maybe<Scalars['ID']['output']>
  regulation?: Maybe<RegulationSerializer>
  regulationId?: Maybe<Scalars['ID']['output']>
  user?: Maybe<LimitedUserSerializer>
  userId: Scalars['ID']['output']
}

export type ChekiShotAtMonthSerializer = {
  __typename?: 'ChekiShotAtMonthSerializer'
  baseTimezone: Scalars['String']['output']
  month: Scalars['Int']['output']
  year: Scalars['Int']['output']
}

export type CurrentUserGroups = {
  __typename?: 'CurrentUserGroups'
  getGroupsCreatedByUser: GroupPaginationSerializer
}

export type CurrentUserGroupsGetGroupsCreatedByUserArgs = {
  page: Scalars['Int']['input']
}

export type CurrentUserIdols = {
  __typename?: 'CurrentUserIdols'
  getIdolsCreatedByUser: IdolPaginationSerializer
}

export type CurrentUserIdolsGetIdolsCreatedByUserArgs = {
  page: Scalars['Int']['input']
}

export type FavoriteGroupMutationServices = {
  __typename?: 'FavoriteGroupMutationServices'
  addFavoriteGroup: FavoriteGroupSerializer
  deleteFavoriteGroup: Scalars['String']['output']
}

export type FavoriteGroupMutationServicesAddFavoriteGroupArgs = {
  groupId: Scalars['ID']['input']
}

export type FavoriteGroupMutationServicesDeleteFavoriteGroupArgs = {
  favoriteGroupID: Scalars['ID']['input']
}

export type FavoriteGroupSerializer = {
  __typename?: 'FavoriteGroupSerializer'
  favoriteGroupId: Scalars['ID']['output']
  group?: Maybe<GroupSerializer>
  groupId: Scalars['ID']['output']
  user?: Maybe<LimitedUserSerializer>
  userId: Scalars['ID']['output']
}

export type FavoriteGroupWithGroupSerializer = {
  __typename?: 'FavoriteGroupWithGroupSerializer'
  favoriteGroupId: Scalars['ID']['output']
  group?: Maybe<GroupSerializer>
  groupId: Scalars['ID']['output']
  user?: Maybe<LimitedUserSerializer>
  userId: Scalars['ID']['output']
}

export type GetChekiMonthIdolCountParamsInput = {
  baseTimezone: Scalars['String']['input']
}

export type GetUserChekiIdolCountParamsInput = {
  chekiShotAtEnd: Scalars['String']['input']
  chekiShotAtStart: Scalars['String']['input']
}

export type GetUserChekisParamsInput = {
  chekiShotAtEnd: Scalars['String']['input']
  chekiShotAtStart: Scalars['String']['input']
  idolId?: InputMaybe<Scalars['ID']['input']>
}

export type GroupMutationServices = {
  __typename?: 'GroupMutationServices'
  addGroup: GroupSerializer
  addIdolToGroup: GroupSerializer
  deleteGroup: Scalars['String']['output']
  removeIdolFromGroup: GroupSerializer
  updateGroup: GroupSerializer
}

export type GroupMutationServicesAddGroupArgs = {
  params: AddOrUpdateGroupParamsInput
}

export type GroupMutationServicesAddIdolToGroupArgs = {
  groupId: Scalars['ID']['input']
  idolId: Scalars['ID']['input']
}

export type GroupMutationServicesDeleteGroupArgs = {
  groupId: Scalars['ID']['input']
}

export type GroupMutationServicesRemoveIdolFromGroupArgs = {
  groupId: Scalars['ID']['input']
  idolId: Scalars['ID']['input']
}

export type GroupMutationServicesUpdateGroupArgs = {
  groupId: Scalars['ID']['input']
  params: AddOrUpdateGroupParamsInput
}

export type GroupPaginationSerializer = PaginationSerializer & {
  __typename?: 'GroupPaginationSerializer'
  count: Scalars['Int']['output']
  currentPage: Scalars['Int']['output']
  groups: Array<GroupSerializer>
  pageCount: Scalars['Int']['output']
}

export type GroupSerializer = {
  __typename?: 'GroupSerializer'
  groupCreatedAt: Scalars['String']['output']
  groupId: Scalars['ID']['output']
  groupName: Scalars['String']['output']
  groupStatus: GroupStatus
  groupUpdatedAt: Scalars['String']['output']
  idols: Array<Maybe<IdolSerializer>>
  regulations: Array<RegulationSerializer>
  user?: Maybe<LimitedUserSerializer>
  userId?: Maybe<Scalars['ID']['output']>
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
  deleteIdol: Scalars['String']['output']
  updateIdol: IdolSerializer
}

export type IdolMutationServicesAddIdolArgs = {
  params: AddOrUpdateIdolParamsInput
}

export type IdolMutationServicesDeleteIdolArgs = {
  idolId: Scalars['ID']['input']
}

export type IdolMutationServicesUpdateIdolArgs = {
  idolId: Scalars['ID']['input']
  params: AddOrUpdateIdolParamsInput
}

export type IdolPaginationSerializer = PaginationSerializer & {
  __typename?: 'IdolPaginationSerializer'
  count: Scalars['Int']['output']
  currentPage: Scalars['Int']['output']
  idols: Array<IdolSerializer>
  pageCount: Scalars['Int']['output']
}

export type IdolSerializer = {
  __typename?: 'IdolSerializer'
  groups: Array<Maybe<GroupSerializer>>
  idolCreatedAt: Scalars['String']['output']
  idolId: Scalars['ID']['output']
  idolName: Scalars['String']['output']
  idolStatus: IdolStatus
  idolUpdatedAt: Scalars['String']['output']
  user?: Maybe<LimitedUserSerializer>
  userId?: Maybe<Scalars['ID']['output']>
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
  userId: Scalars['ID']['output']
  userName: Scalars['String']['output']
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
  count: Scalars['Int']['output']
  currentPage: Scalars['Int']['output']
  pageCount: Scalars['Int']['output']
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
  getCsrfToken: Scalars['String']['output']
  getGroup: GroupSerializer
  getIdol: IdolSerializer
  getRegulation: RegulationSerializer
  userFavoriteGroups: UserFavoriteGroup
}

export type QueryGetAllIdolsArgs = {
  page: Scalars['Int']['input']
}

export type QueryGetChekiArgs = {
  chekiId: Scalars['ID']['input']
}

export type QueryGetGroupArgs = {
  groupId: Scalars['ID']['input']
}

export type QueryGetIdolArgs = {
  idolId: Scalars['ID']['input']
}

export type QueryGetRegulationArgs = {
  regulationId: Scalars['ID']['input']
}

export type RegulationMutationServices = {
  __typename?: 'RegulationMutationServices'
  addRegulation: RegulationSerializer
  deleteRegulation: Scalars['String']['output']
  updateRegulation: RegulationSerializer
}

export type RegulationMutationServicesAddRegulationArgs = {
  params: AddOrUpdateRegulationParamsInput
}

export type RegulationMutationServicesDeleteRegulationArgs = {
  regulationId: Scalars['ID']['input']
}

export type RegulationMutationServicesUpdateRegulationArgs = {
  params: AddOrUpdateRegulationParamsInput
  regulationId: Scalars['ID']['input']
}

export type RegulationSerializer = {
  __typename?: 'RegulationSerializer'
  group?: Maybe<GroupSerializer>
  groupId: Scalars['ID']['output']
  regulationComment: Scalars['String']['output']
  regulationCreatedAt: Scalars['String']['output']
  regulationId: Scalars['ID']['output']
  regulationName: Scalars['String']['output']
  regulationStatus: RegulationStatus
  regulationUnitPrice: Scalars['Int']['output']
  regulationUpdatedAt: Scalars['String']['output']
  user?: Maybe<LimitedUserSerializer>
  userId?: Maybe<Scalars['ID']['output']>
}

export enum RegulationStatus {
  Active = 'ACTIVE',
  NotActive = 'NOT_ACTIVE',
  OperationDeleted = 'OPERATION_DELETED',
}

export type SendAuth0PasswordResetEmailParamsInput = {
  auth0EmailAddress: Scalars['String']['input']
}

export type UpdateAdminUserParamsInput = {
  email: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type UpdateAdminUserPasswordParamsInput = {
  password: Scalars['String']['input']
}

export type UpdateUserNameParamsInput = {
  userName: Scalars['String']['input']
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
  email: Scalars['String']['input']
  name: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type UserFavoriteGroup = {
  __typename?: 'UserFavoriteGroup'
  favoriteGroups: Array<FavoriteGroupWithGroupSerializer>
}

export type UserLoginParamsInput = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type UserMutationServices = {
  __typename?: 'UserMutationServices'
  sendAuth0PasswordResetEmail: Scalars['String']['output']
  updateUserName: Scalars['String']['output']
  userCreate: UserSerializer
  userLogin: UserSerializer
  userLogout: Scalars['String']['output']
}

export type UserMutationServicesSendAuth0PasswordResetEmailArgs = {
  params: SendAuth0PasswordResetEmailParamsInput
}

export type UserMutationServicesUpdateUserNameArgs = {
  params: UpdateUserNameParamsInput
}

export type UserMutationServicesUserCreateArgs = {
  params: UserCreateParamsInput
}

export type UserMutationServicesUserLoginArgs = {
  params: UserLoginParamsInput
}

export type UserSerializer = {
  __typename?: 'UserSerializer'
  userCreatedAt: Scalars['String']['output']
  userEmail?: Maybe<Scalars['String']['output']>
  userEmailVerifiedAt?: Maybe<Scalars['String']['output']>
  userId: Scalars['ID']['output']
  userName: Scalars['String']['output']
  userUpdatedAt: Scalars['String']['output']
}

export type AddChekiMutationVariables = Exact<{
  cheki: AddOrUpdateChekiParamsInput
}>

export type AddChekiMutation = {
  __typename?: 'Mutation'
  cheki: {
    __typename?: 'ChekiMutationServices'
    addCheki: { __typename?: 'ChekiSerializer'; chekiId: string }
  }
}

export type AddGroupMutationVariables = Exact<{
  group: AddOrUpdateGroupParamsInput
}>

export type AddGroupMutation = {
  __typename?: 'Mutation'
  group: {
    __typename?: 'GroupMutationServices'
    addGroup: {
      __typename?: 'GroupSerializer'
      groupCreatedAt: string
      groupId: string
      groupName: string
      groupStatus: GroupStatus
      groupUpdatedAt: string
      userId?: string | null
      user?: {
        __typename?: 'LimitedUserSerializer'
        userId: string
        userName: string
      } | null
      regulations: Array<{
        __typename?: 'RegulationSerializer'
        regulationComment: string
        regulationCreatedAt: string
        regulationId: string
        regulationName: string
        regulationStatus: RegulationStatus
        regulationUnitPrice: number
        regulationUpdatedAt: string
      }>
      idols: Array<{
        __typename?: 'IdolSerializer'
        idolCreatedAt: string
        idolId: string
        idolName: string
        idolStatus: IdolStatus
        idolUpdatedAt: string
        userId?: string | null
        user?: {
          __typename?: 'LimitedUserSerializer'
          userId: string
          userName: string
        } | null
        groups: Array<{
          __typename?: 'GroupSerializer'
          groupId: string
          groupName: string
        } | null>
      } | null>
    }
  }
}

export type AddIdolMutationVariables = Exact<{
  idol: AddOrUpdateIdolParamsInput
}>

export type AddIdolMutation = {
  __typename?: 'Mutation'
  idol: {
    __typename?: 'IdolMutationServices'
    addIdol: {
      __typename?: 'IdolSerializer'
      idolCreatedAt: string
      idolId: string
      idolName: string
      idolStatus: IdolStatus
      idolUpdatedAt: string
      user?: {
        __typename?: 'LimitedUserSerializer'
        userId: string
        userName: string
      } | null
    }
  }
}

export type AddIdolToGroupMutationVariables = Exact<{
  groupId: Scalars['ID']['input']
  idolId: Scalars['ID']['input']
}>

export type AddIdolToGroupMutation = {
  __typename?: 'Mutation'
  group: {
    __typename?: 'GroupMutationServices'
    addIdolToGroup: { __typename?: 'GroupSerializer'; groupId: string }
  }
}

export type AddRegulationToGroupMutationVariables = Exact<{
  regulation: AddOrUpdateRegulationParamsInput
}>

export type AddRegulationToGroupMutation = {
  __typename?: 'Mutation'
  regulation: {
    __typename?: 'RegulationMutationServices'
    addRegulation: { __typename?: 'RegulationSerializer'; regulationId: string }
  }
}

export type DeleteChekiMutationVariables = Exact<{
  chekiId: Scalars['ID']['input']
}>

export type DeleteChekiMutation = {
  __typename?: 'Mutation'
  cheki: { __typename?: 'ChekiMutationServices'; deleteCheki: string }
}

export type DeleteGroupMutationVariables = Exact<{
  groupId: Scalars['ID']['input']
}>

export type DeleteGroupMutation = {
  __typename?: 'Mutation'
  group: { __typename?: 'GroupMutationServices'; deleteGroup: string }
}

export type DeleteIdolMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteIdolMutation = {
  __typename?: 'Mutation'
  idol: { __typename?: 'IdolMutationServices'; deleteIdol: string }
}

export type DeleteRegulationMutationVariables = Exact<{
  regulationId: Scalars['ID']['input']
}>

export type DeleteRegulationMutation = {
  __typename?: 'Mutation'
  regulation: {
    __typename?: 'RegulationMutationServices'
    deleteRegulation: string
  }
}

export type EditGroupMutationVariables = Exact<{
  groupId: Scalars['ID']['input']
  group: AddOrUpdateGroupParamsInput
}>

export type EditGroupMutation = {
  __typename?: 'Mutation'
  group: {
    __typename?: 'GroupMutationServices'
    updateGroup: {
      __typename?: 'GroupSerializer'
      groupCreatedAt: string
      groupId: string
      groupName: string
      groupStatus: GroupStatus
      groupUpdatedAt: string
      userId?: string | null
      user?: {
        __typename?: 'LimitedUserSerializer'
        userId: string
        userName: string
      } | null
      regulations: Array<{
        __typename?: 'RegulationSerializer'
        regulationComment: string
        regulationCreatedAt: string
        regulationId: string
        regulationName: string
        regulationStatus: RegulationStatus
        regulationUnitPrice: number
        regulationUpdatedAt: string
      }>
      idols: Array<{
        __typename?: 'IdolSerializer'
        idolCreatedAt: string
        idolId: string
        idolName: string
        idolStatus: IdolStatus
        idolUpdatedAt: string
        userId?: string | null
        user?: {
          __typename?: 'LimitedUserSerializer'
          userId: string
          userName: string
        } | null
        groups: Array<{
          __typename?: 'GroupSerializer'
          groupId: string
          groupName: string
        } | null>
      } | null>
    }
  }
}

export type EditIdolMutationVariables = Exact<{
  idolId: Scalars['ID']['input']
  idol: AddOrUpdateIdolParamsInput
}>

export type EditIdolMutation = {
  __typename?: 'Mutation'
  idol: {
    __typename?: 'IdolMutationServices'
    updateIdol: {
      __typename?: 'IdolSerializer'
      idolCreatedAt: string
      idolId: string
      idolName: string
      idolStatus: IdolStatus
      idolUpdatedAt: string
      userId?: string | null
      groups: Array<{
        __typename?: 'GroupSerializer'
        groupName: string
        groupId: string
      } | null>
      user?: {
        __typename?: 'LimitedUserSerializer'
        userId: string
        userName: string
      } | null
    }
  }
}

export type GetChekiMonthIdolCountQueryVariables = Exact<{
  baseTimezone: Scalars['String']['input']
}>

export type GetChekiMonthIdolCountQuery = {
  __typename?: 'Query'
  currentUserChekis: {
    __typename?: 'UserChekis'
    getChekiMonthIdolCount: Array<{
      __typename?: 'ChekiMonthIdolCountSerializer'
      chekiCount: number
      idolId: string
      chekiShotAtMonth: {
        __typename?: 'ChekiShotAtMonthSerializer'
        baseTimezone: string
        year: number
        month: number
      }
      idol?: { __typename?: 'IdolSerializer'; idolName: string } | null
    }>
  }
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

export type GetGroupQueryVariables = Exact<{
  groupId: Scalars['ID']['input']
}>

export type GetGroupQuery = {
  __typename?: 'Query'
  getGroup: {
    __typename?: 'GroupSerializer'
    groupCreatedAt: string
    groupId: string
    groupName: string
    groupStatus: GroupStatus
    groupUpdatedAt: string
    userId?: string | null
    user?: {
      __typename?: 'LimitedUserSerializer'
      userId: string
      userName: string
    } | null
    regulations: Array<{
      __typename?: 'RegulationSerializer'
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
      __typename?: 'IdolSerializer'
      idolCreatedAt: string
      idolId: string
      idolName: string
      idolStatus: IdolStatus
      idolUpdatedAt: string
      userId?: string | null
      user?: {
        __typename?: 'LimitedUserSerializer'
        userId: string
        userName: string
      } | null
      groups: Array<{
        __typename?: 'GroupSerializer'
        groupId: string
        groupName: string
      } | null>
    } | null>
  }
}

export type GetIdolQueryVariables = Exact<{
  idolId: Scalars['ID']['input']
}>

export type GetIdolQuery = {
  __typename?: 'Query'
  getIdol: {
    __typename?: 'IdolSerializer'
    idolCreatedAt: string
    idolId: string
    idolName: string
    idolStatus: IdolStatus
    idolUpdatedAt: string
    userId?: string | null
    groups: Array<{
      __typename?: 'GroupSerializer'
      groupName: string
      groupId: string
    } | null>
    user?: {
      __typename?: 'LimitedUserSerializer'
      userId: string
      userName: string
    } | null
  }
}

export type GetIdolChekisByDateRangeAndIdolIdQueryVariables = Exact<{
  chekiShotAtStart: Scalars['String']['input']
  chekiShotAtEnd: Scalars['String']['input']
  idolId: Scalars['ID']['input']
}>

export type GetIdolChekisByDateRangeAndIdolIdQuery = {
  __typename?: 'Query'
  currentUserChekis: {
    __typename?: 'UserChekis'
    getUserChekis: Array<{
      __typename?: 'ChekiSerializer'
      chekiCreatedAt: string
      chekiId: string
      chekiQuantity: number
      chekiShotAt: string
      chekiUpdatedAt: string
      idolId?: string | null
      regulationId?: string | null
      userId: string
      regulation?: {
        __typename?: 'RegulationSerializer'
        groupId: string
        regulationComment: string
        regulationCreatedAt: string
        regulationId: string
        regulationName: string
        regulationStatus: RegulationStatus
        regulationUnitPrice: number
        regulationUpdatedAt: string
        userId?: string | null
        group?: {
          __typename?: 'GroupSerializer'
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
  idolId: Scalars['ID']['input']
}>

export type GetIdolDetailsForChekiAddQuery = {
  __typename?: 'Query'
  getIdol: {
    __typename?: 'IdolSerializer'
    idolCreatedAt: string
    idolId: string
    idolName: string
    idolStatus: IdolStatus
    idolUpdatedAt: string
    userId?: string | null
    groups: Array<{
      __typename?: 'GroupSerializer'
      groupName: string
      groupId: string
      regulations: Array<{
        __typename?: 'RegulationSerializer'
        regulationComment: string
        regulationCreatedAt: string
        regulationId: string
        regulationName: string
        regulationStatus: RegulationStatus
        regulationUnitPrice: number
        regulationUpdatedAt: string
      }>
    } | null>
    user?: {
      __typename?: 'LimitedUserSerializer'
      userId: string
      userName: string
    } | null
  }
}

export type GetRegulationQueryVariables = Exact<{
  regulationId: Scalars['ID']['input']
}>

export type GetRegulationQuery = {
  __typename?: 'Query'
  getRegulation: {
    __typename?: 'RegulationSerializer'
    groupId: string
    regulationComment: string
    regulationCreatedAt: string
    regulationId: string
    regulationName: string
    regulationStatus: RegulationStatus
    regulationUnitPrice: number
    regulationUpdatedAt: string
    userId?: string | null
  }
}

export type GetUserChekiIdolCountQueryVariables = Exact<{
  chekiShotAtStart: Scalars['String']['input']
  chekiShotAtEnd: Scalars['String']['input']
}>

export type GetUserChekiIdolCountQuery = {
  __typename?: 'Query'
  currentUserChekis: {
    __typename?: 'UserChekis'
    getUserChekiIdolCount: Array<{
      __typename?: 'ChekiIdolCountSerializer'
      chekiCount: number
      totalPrice: number
      idol?: {
        __typename?: 'IdolSerializer'
        idolId: string
        idolName: string
      } | null
    }>
  }
}

export type GetUserCreatedGroupListQueryVariables = Exact<{
  page: Scalars['Int']['input']
}>

export type GetUserCreatedGroupListQuery = {
  __typename?: 'Query'
  currentUserGroups: {
    __typename?: 'CurrentUserGroups'
    getGroupsCreatedByUser: {
      __typename?: 'GroupPaginationSerializer'
      count: number
      currentPage: number
      pageCount: number
      groups: Array<{
        __typename?: 'GroupSerializer'
        groupCreatedAt: string
        groupId: string
        groupName: string
        groupStatus: GroupStatus
        groupUpdatedAt: string
        userId?: string | null
        user?: {
          __typename?: 'LimitedUserSerializer'
          userId: string
          userName: string
        } | null
      }>
    }
  }
}

export type GetUserCreatedGroupListWithIdolsQueryVariables = Exact<{
  page: Scalars['Int']['input']
}>

export type GetUserCreatedGroupListWithIdolsQuery = {
  __typename?: 'Query'
  currentUserGroups: {
    __typename?: 'CurrentUserGroups'
    getGroupsCreatedByUser: {
      __typename?: 'GroupPaginationSerializer'
      count: number
      currentPage: number
      pageCount: number
      groups: Array<{
        __typename?: 'GroupSerializer'
        groupCreatedAt: string
        groupId: string
        groupName: string
        groupStatus: GroupStatus
        groupUpdatedAt: string
        userId?: string | null
        user?: {
          __typename?: 'LimitedUserSerializer'
          userId: string
          userName: string
        } | null
        idols: Array<{
          __typename?: 'IdolSerializer'
          idolId: string
          idolName: string
          idolStatus: IdolStatus
          groups: Array<{
            __typename?: 'GroupSerializer'
            groupName: string
            groupId: string
          } | null>
        } | null>
      }>
    }
  }
}

export type GetUserCreatedIdolListQueryVariables = Exact<{
  page: Scalars['Int']['input']
}>

export type GetUserCreatedIdolListQuery = {
  __typename?: 'Query'
  currentUserIdols: {
    __typename?: 'CurrentUserIdols'
    getIdolsCreatedByUser: {
      __typename?: 'IdolPaginationSerializer'
      count: number
      currentPage: number
      pageCount: number
      idols: Array<{
        __typename?: 'IdolSerializer'
        idolName: string
        idolId: string
        idolStatus: IdolStatus
        userId?: string | null
        idolUpdatedAt: string
        idolCreatedAt: string
        groups: Array<{
          __typename?: 'GroupSerializer'
          groupName: string
          groupId: string
        } | null>
      }>
    }
  }
}

export type RemoveIdolFromGroupMutationVariables = Exact<{
  groupId: Scalars['ID']['input']
  idolId: Scalars['ID']['input']
}>

export type RemoveIdolFromGroupMutation = {
  __typename?: 'Mutation'
  group: {
    __typename?: 'GroupMutationServices'
    removeIdolFromGroup: { __typename?: 'GroupSerializer'; groupId: string }
  }
}

export type ResetAuth0UserPasswordMutationVariables = Exact<{
  params: SendAuth0PasswordResetEmailParamsInput
}>

export type ResetAuth0UserPasswordMutation = {
  __typename?: 'Mutation'
  user: {
    __typename?: 'UserMutationServices'
    sendAuth0PasswordResetEmail: string
  }
}

export type UpdateRegulationMutationVariables = Exact<{
  regulationId: Scalars['ID']['input']
  regulation: AddOrUpdateRegulationParamsInput
}>

export type UpdateRegulationMutation = {
  __typename?: 'Mutation'
  regulation: {
    __typename?: 'RegulationMutationServices'
    updateRegulation: {
      __typename?: 'RegulationSerializer'
      regulationId: string
    }
  }
}

export type UpdateUserNameMutationVariables = Exact<{
  params: UpdateUserNameParamsInput
}>

export type UpdateUserNameMutation = {
  __typename?: 'Mutation'
  user: { __typename?: 'UserMutationServices'; updateUserName: string }
}

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
    ): Promise<AddChekiMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddChekiMutation>(AddChekiDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'AddCheki',
        'mutation',
        variables,
      )
    },
    AddGroup(
      variables: AddGroupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<AddGroupMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddGroupMutation>(AddGroupDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'AddGroup',
        'mutation',
        variables,
      )
    },
    AddIdol(
      variables: AddIdolMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<AddIdolMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddIdolMutation>(AddIdolDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'AddIdol',
        'mutation',
        variables,
      )
    },
    AddIdolToGroup(
      variables: AddIdolToGroupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<AddIdolToGroupMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddIdolToGroupMutation>(
            AddIdolToGroupDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'AddIdolToGroup',
        'mutation',
        variables,
      )
    },
    AddRegulationToGroup(
      variables: AddRegulationToGroupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<AddRegulationToGroupMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddRegulationToGroupMutation>(
            AddRegulationToGroupDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'AddRegulationToGroup',
        'mutation',
        variables,
      )
    },
    DeleteCheki(
      variables: DeleteChekiMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<DeleteChekiMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteChekiMutation>(DeleteChekiDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteCheki',
        'mutation',
        variables,
      )
    },
    DeleteGroup(
      variables: DeleteGroupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<DeleteGroupMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteGroupMutation>(DeleteGroupDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteGroup',
        'mutation',
        variables,
      )
    },
    DeleteIdol(
      variables: DeleteIdolMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<DeleteIdolMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteIdolMutation>(DeleteIdolDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteIdol',
        'mutation',
        variables,
      )
    },
    DeleteRegulation(
      variables: DeleteRegulationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<DeleteRegulationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteRegulationMutation>(
            DeleteRegulationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteRegulation',
        'mutation',
        variables,
      )
    },
    EditGroup(
      variables: EditGroupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<EditGroupMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EditGroupMutation>(EditGroupDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'EditGroup',
        'mutation',
        variables,
      )
    },
    EditIdol(
      variables: EditIdolMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<EditIdolMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EditIdolMutation>(EditIdolDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'EditIdol',
        'mutation',
        variables,
      )
    },
    GetChekiMonthIdolCount(
      variables: GetChekiMonthIdolCountQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetChekiMonthIdolCountQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetChekiMonthIdolCountQuery>(
            GetChekiMonthIdolCountDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetChekiMonthIdolCount',
        'query',
        variables,
      )
    },
    GetCSRFToken(
      variables?: GetCsrfTokenQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetCsrfTokenQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetCsrfTokenQuery>(GetCsrfTokenDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetCSRFToken',
        'query',
        variables,
      )
    },
    GetCurrentUser(
      variables?: GetCurrentUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetCurrentUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetCurrentUserQuery>(
            GetCurrentUserDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetCurrentUser',
        'query',
        variables,
      )
    },
    GetGroup(
      variables: GetGroupQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetGroupQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetGroupQuery>(GetGroupDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetGroup',
        'query',
        variables,
      )
    },
    GetIdol(
      variables: GetIdolQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetIdolQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetIdolQuery>(GetIdolDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetIdol',
        'query',
        variables,
      )
    },
    GetIdolChekisByDateRangeAndIdolId(
      variables: GetIdolChekisByDateRangeAndIdolIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetIdolChekisByDateRangeAndIdolIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetIdolChekisByDateRangeAndIdolIdQuery>(
            GetIdolChekisByDateRangeAndIdolIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetIdolChekisByDateRangeAndIdolId',
        'query',
        variables,
      )
    },
    GetIdolDetailsForChekiAdd(
      variables: GetIdolDetailsForChekiAddQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetIdolDetailsForChekiAddQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetIdolDetailsForChekiAddQuery>(
            GetIdolDetailsForChekiAddDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetIdolDetailsForChekiAdd',
        'query',
        variables,
      )
    },
    GetRegulation(
      variables: GetRegulationQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetRegulationQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetRegulationQuery>(GetRegulationDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetRegulation',
        'query',
        variables,
      )
    },
    GetUserChekiIdolCount(
      variables: GetUserChekiIdolCountQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetUserChekiIdolCountQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserChekiIdolCountQuery>(
            GetUserChekiIdolCountDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetUserChekiIdolCount',
        'query',
        variables,
      )
    },
    GetUserCreatedGroupList(
      variables: GetUserCreatedGroupListQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetUserCreatedGroupListQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserCreatedGroupListQuery>(
            GetUserCreatedGroupListDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetUserCreatedGroupList',
        'query',
        variables,
      )
    },
    GetUserCreatedGroupListWithIdols(
      variables: GetUserCreatedGroupListWithIdolsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetUserCreatedGroupListWithIdolsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserCreatedGroupListWithIdolsQuery>(
            GetUserCreatedGroupListWithIdolsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetUserCreatedGroupListWithIdols',
        'query',
        variables,
      )
    },
    GetUserCreatedIdolList(
      variables: GetUserCreatedIdolListQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetUserCreatedIdolListQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserCreatedIdolListQuery>(
            GetUserCreatedIdolListDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetUserCreatedIdolList',
        'query',
        variables,
      )
    },
    RemoveIdolFromGroup(
      variables: RemoveIdolFromGroupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<RemoveIdolFromGroupMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RemoveIdolFromGroupMutation>(
            RemoveIdolFromGroupDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'RemoveIdolFromGroup',
        'mutation',
        variables,
      )
    },
    ResetAuth0UserPassword(
      variables: ResetAuth0UserPasswordMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<ResetAuth0UserPasswordMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ResetAuth0UserPasswordMutation>(
            ResetAuth0UserPasswordDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ResetAuth0UserPassword',
        'mutation',
        variables,
      )
    },
    UpdateRegulation(
      variables: UpdateRegulationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<UpdateRegulationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateRegulationMutation>(
            UpdateRegulationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateRegulation',
        'mutation',
        variables,
      )
    },
    UpdateUserName(
      variables: UpdateUserNameMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<UpdateUserNameMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateUserNameMutation>(
            UpdateUserNameDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateUserName',
        'mutation',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
