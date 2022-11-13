import { AppDispatch, useAppSelector } from '../index'
import { userSlice } from './userStore'
import { colneGraphQLSdk } from '../../graphql/client'

export function useUpdateCurrentUserState() {
  return async function (dispatch: AppDispatch) {
    return updateCurrentUserState(dispatch)
  }
}

export function useInitialCurrentUserState() {
  const userState = useAppSelector((state) => state.user)
  return async function (dispatch: AppDispatch) {
    if (userState.currentUser !== null) {
      return
    }
    return updateCurrentUserState(dispatch)
  }
}

export async function updateCurrentUserState(dispatch: AppDispatch) {
  const user = await colneGraphQLSdk.GetCurrentUser()
  dispatch(userSlice.actions.updateUserState(user.currentUser ?? null))
}
