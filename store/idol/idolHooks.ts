import { AppDispatch, useAppDispatch } from 'store/index'
import { colneGraphQLSdk } from 'graphql/client'
import { AddIdolMutationVariables } from 'graphql/generated/client'
import { idolSlice } from 'store/idol/idolStore'

export async function addIdol(
  dispatch: AppDispatch,
  params: AddIdolMutationVariables,
  headers?: Record<string, string>
) {
  const idol = await colneGraphQLSdk.AddIdol(params, headers)
  await dispatch(idolSlice.actions.updateOrAddIdol(idol.idol.addIdol))
}

export function useAddIdol() {
  const dispatch = useAppDispatch()
  return function (params: AddIdolMutationVariables) {
    return addIdol(dispatch, params)
  }
}
