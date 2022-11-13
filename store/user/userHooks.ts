import { AppDispatch } from '../index'
import { userSlice } from './userStore'

export function useUpdateCurrentUserState() {
  return async function (dispatch: AppDispatch) {
    dispatch(userSlice.actions.updateUserState())
  }
}
