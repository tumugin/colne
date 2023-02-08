import { createSlice, PayloadAction } from '@reduxjs/toolkit'

enum IdolStatus {
  OperationDeleted = 'OPERATION_DELETED',
  PrivateActive = 'PRIVATE_ACTIVE',
  PrivateNotActive = 'PRIVATE_NOT_ACTIVE',
  PublicActive = 'PUBLIC_ACTIVE',
  PublicNotActive = 'PUBLIC_NOT_ACTIVE',
}

interface Idol {
  idolCreatedAt: string
  idolId: string
  idolName: string
  idolStatus: IdolStatus
  idolUpdatedAt: string
  user?: {
    userId: string
    userName: string
  } | null
  groups: {
    groupId: string
    groupName: string
  }[]
}

interface IdolForChekiAdd {
  idolCreatedAt: string
  idolId: string
  idolName: string
  idolStatus: IdolStatus
  idolUpdatedAt: string
  user?: {
    userId: string
    userName: string
  } | null
  groups: {
    groupId: string
    groupName: string
    regulations: {
      regulationComment: string
      regulationCreatedAt: string
      regulationId: string
      regulationName: string
      regulationStatus: string
      regulationUnitPrice: number
      regulationUpdatedAt: string
    }[]
  }[]
}

interface State {
  idols: {
    [idolId: string]: Idol | undefined
  }
  idolForChekiAdd: {
    [idolId: string]: IdolForChekiAdd | undefined
  }
  userCreatedIdols: {
    isLoaded: boolean
    count: number | null
    currentPage: number
    pageCount: number | null
    idols: Idol[]
  }
}

const initialState: State = {
  idols: {},
  idolForChekiAdd: {},
  userCreatedIdols: {
    isLoaded: false,
    count: null,
    currentPage: 1,
    pageCount: null,
    idols: [],
  },
}

export const idolSlice = createSlice({
  name: 'idol',
  initialState,
  reducers: {
    updateOrAddIdol(state, action: PayloadAction<Idol>) {
      state.idols[action.payload.idolId] = action.payload
    },
    updateOrAddIdolForChekiAdd(state, action: PayloadAction<IdolForChekiAdd>) {
      state.idolForChekiAdd[action.payload.idolId] = action.payload
    },
    updateUserCreatedIdols(
      state,
      action: PayloadAction<State['userCreatedIdols']>
    ) {
      state.userCreatedIdols = action.payload
    },
    setUserCreatedIdolsToLoading(
      state,
      action: PayloadAction<{ page: number }>
    ) {
      state.userCreatedIdols.currentPage = action.payload.page
      state.userCreatedIdols.isLoaded = false
      state.userCreatedIdols.idols = []
    },
    deleteIdol(state, action: PayloadAction<{ idolId: string }>) {
      delete state.idols[action.payload.idolId]
      delete state.idolForChekiAdd[action.payload.idolId]
    },
  },
})
