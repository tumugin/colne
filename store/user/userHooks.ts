import { AppDispatch, useAppSelector } from '../index'
import { userSlice } from './userStore'
import { colneGraphQLSdk } from 'graphql/client'
import { useCallback } from 'react'

export function useUpdateCurrentUserState() {
  return useCallback((dispatch: AppDispatch) => {
    return updateCurrentUserState(dispatch)
  }, [])
}

export function useInitialCurrentUserState() {
  const userState = useAppSelector((state) => state.user)
  return useCallback((dispatch: AppDispatch) => {
    if (userState.currentUser !== null) {
      return
    }
    return updateCurrentUserState(dispatch)
  }, [userState.currentUser])
}

export async function updateCurrentUserState(
  dispatch: AppDispatch,
  headers?: Record<string, string>
) {
  const user = await colneGraphQLSdk.GetCurrentUser(undefined, headers)
  await dispatch(userSlice.actions.updateUserState(user.currentUser ?? null))
}
