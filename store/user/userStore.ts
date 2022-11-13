import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CurrentUser {
  userCreatedAt: string
  userEmail?: string | null
  userEmailVerifiedAt?: string | null
  userId: string
  userName: string
  userUpdatedAt: string
}

interface State {
  currentUser: CurrentUser | null
}

const initialState: State = { currentUser: null }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserState(state, action: PayloadAction<CurrentUser | null>) {
      state.currentUser = action.payload
    },
  },
})
