import { AppDispatch, useAppSelector } from '../index'
import { userSlice } from './userStore'
import { colneGraphQLSdk } from '../../graphql/client'
import { IncomingHttpHeaders } from 'http'

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

export async function updateCurrentUserState(
  dispatch: AppDispatch,
  headers?: Record<string, string>
) {
  const user = await colneGraphQLSdk.GetCurrentUser(undefined, headers)
  await dispatch(userSlice.actions.updateUserState(user.currentUser ?? null))
}
