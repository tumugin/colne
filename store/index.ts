import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { userSlice } from './user/userStore'
import { commonSlice } from 'store/common/commonStore'
import { chekiSlice } from 'store/cheki/chekiStore'
import { idolSlice } from 'store/idol/idolStore'

const combinedReducer = combineReducers({
  user: userSlice.reducer,
  common: commonSlice.reducer,
  cheki: chekiSlice.reducer,
  idol: idolSlice.reducer,
})

// https://stackoverflow.com/questions/70426965/how-to-use-next-redux-wrapper-with-next-js-redux-toolkit-and-typescript-p
function reducer(
  state: ReturnType<typeof combinedReducer> | undefined,
  action: AnyAction
) {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    } as const
  } else {
    return combinedReducer(state, action)
  }
}

const makeStore = () =>
  configureStore({
    reducer,
  })

type Store = ReturnType<typeof makeStore>
export type AppDispatch = Store['dispatch']
export type RootState = ReturnType<Store['getState']>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const wrapper = createWrapper(makeStore, {})
