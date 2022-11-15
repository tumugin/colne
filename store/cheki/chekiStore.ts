import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  currentUserChekiIdolCount:
    | {
        chekiCount: number
        idol: {
          idolId: string
          idolName: string
        } | null
      }[]
    | null
}

const initialState: State = {
  currentUserChekiIdolCount: null,
}

export const chekiSlice = createSlice({
  name: 'cheki',
  initialState,
  reducers: {
    updateCurrentUserChekiIdolCount(
      state,
      action: PayloadAction<State['currentUserChekiIdolCount']>
    ) {
      state.currentUserChekiIdolCount = action.payload
    },
  },
})
