import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CommonStoreState {
  csrfToken: string | null
}

const initialState: CommonStoreState = {
  csrfToken: null,
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    updateCsrfToken(state, action: PayloadAction<string>) {
      state.csrfToken = action.payload
    },
  },
})
