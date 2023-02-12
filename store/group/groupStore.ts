import { createSlice, PayloadAction } from '@reduxjs/toolkit'

enum GroupStatus {
  OperationDeleted = 'OPERATION_DELETED',
  PrivateActive = 'PRIVATE_ACTIVE',
  PrivateNotActive = 'PRIVATE_NOT_ACTIVE',
  PublicActive = 'PUBLIC_ACTIVE',
  PublicNotActive = 'PUBLIC_NOT_ACTIVE',
}

interface Group {
  groupCreatedAt: string
  groupId: string
  groupName: string
  groupStatus: GroupStatus
  groupUpdatedAt: string
  user?: {
    userId: string
    userName: string
  } | null
  idols?: {
    idolId: string
    idolName: string
    groups: {
      groupId: string
      groupName: string
    }[]
  }[]
  regulations?: {
    regulationComment: string
    regulationCreatedAt: string
    regulationId: string
    regulationName: string
    regulationStatus: string
    regulationUnitPrice: number
    regulationUpdatedAt: string
  }[]
}

interface State {
  groups: {
    [groupId: string]: Group | undefined
  }
  userCreatedGroups: {
    isLoaded: boolean
    count: number | null
    currentPage: number
    pageCount: number | null
    groups: Group[]
  }
}

const initialState: State = {
  groups: {},
  userCreatedGroups: {
    isLoaded: false,
    count: null,
    currentPage: 1,
    pageCount: null,
    groups: [],
  },
}

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    updateOrAddGroup: (state, action: PayloadAction<Group>) => {
      state.groups[action.payload.groupId] = action.payload
    },
    deleteGroup: (state, action: PayloadAction<{ groupId: string }>) => {
      delete state.groups[action.payload.groupId]
    },
    updateUserCreatedGroups(
      state,
      action: PayloadAction<State['userCreatedGroups']>
    ) {
      state.userCreatedGroups = action.payload
    },
    setUserCreatedGroupsToLoading(
      state,
      action: PayloadAction<{ page: number }>
    ) {
      state.userCreatedGroups.currentPage = action.payload.page
      state.userCreatedGroups.isLoaded = false
      state.userCreatedGroups.groups = []
    },
  },
})
