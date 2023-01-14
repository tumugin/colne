import { AppDispatch, useAppDispatch } from 'store/index'
import { colneGraphQLSdk } from 'graphql/client'
import {
  AddIdolMutationVariables,
  GetUserCreatedIdolListQueryVariables,
} from 'graphql/generated/client'
import { idolSlice } from 'store/idol/idolStore'
import { nonNullable } from 'utils/array'

export async function addIdol(
  dispatch: AppDispatch,
  params: AddIdolMutationVariables,
  headers?: Record<string, string>
) {
  const idol = await colneGraphQLSdk.AddIdol(params, headers)
  await dispatch(
    idolSlice.actions.updateOrAddIdol({ ...idol.idol.addIdol, groups: [] })
  )
}

export function useAddIdol() {
  const dispatch = useAppDispatch()
  return function (params: AddIdolMutationVariables) {
    return addIdol(dispatch, params)
  }
}

export async function getUserCreatedIdols(
  dispatch: AppDispatch,
  params: GetUserCreatedIdolListQueryVariables,
  headers?: Record<string, string>
) {
  await dispatch(
    idolSlice.actions.setUserCreatedIdolsToLoading({ page: params.page })
  )
  const idols = await colneGraphQLSdk.GetUserCreatedIdolList(params, headers)
  await dispatch(
    idolSlice.actions.updateUserCreatedIdols({
      isLoaded: true,
      count: idols.currentUserIdols.getIdolsCreatedByUser.count,
      currentPage: idols.currentUserIdols.getIdolsCreatedByUser.currentPage,
      pageCount: idols.currentUserIdols.getIdolsCreatedByUser.pageCount,
      idols: idols.currentUserIdols.getIdolsCreatedByUser.idols.map((p) => ({
        ...p,
        groups: p.groups.filter(nonNullable),
      })),
    })
  )
}

export function useGetUserCreatedIdols() {
  const dispatch = useAppDispatch()
  return function (params: GetUserCreatedIdolListQueryVariables) {
    return getUserCreatedIdols(dispatch, params)
  }
}
