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
}

interface State {
  idols: {
    [idolId: string]: Idol
  }
}

const initialState: State = { idols: {} }

export const idolSlice = createSlice({
  name: 'idol',
  initialState,
  reducers: {
    updateOrAddIdol(state, action: PayloadAction<Idol>) {
      state.idols[action.payload.idolId] = action.payload
    },
  },
})
