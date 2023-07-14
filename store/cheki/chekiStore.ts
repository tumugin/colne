import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Cheki {
  chekiId: string
  idolId?: string
  regulationId?: string
  chekiQuantity: number
  chekiShotAt: string
  regulation?: {
    regulationId: string
    groupId: string
    regulationName: string
    regulationComment: string
    regulationUnitPrice: number
    regulationStatus: string
    group?: {
      groupId: string
      groupName: string
    }
  }
}

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
  idolChekis: {
    [idolId: string]:
      | {
          isLoaded: boolean
          dateTimeRangeStart: string
          dateTimeRangeEnd: string
          chekis: Cheki[]
        }
      | undefined
  }
}

const initialState: State = {
  currentUserChekiIdolCount: null,
  idolChekis: {},
}

export const chekiSlice = createSlice({
  name: 'cheki',
  initialState,
  reducers: {
    updateCurrentUserChekiIdolCount(
      state,
      action: PayloadAction<State['currentUserChekiIdolCount']>,
    ) {
      state.currentUserChekiIdolCount = action.payload
    },
    updateIdolChekis(state, action: PayloadAction<State['idolChekis']>) {
      state.idolChekis = {
        ...state.idolChekis,
        ...action.payload,
      }
    },
  },
})
