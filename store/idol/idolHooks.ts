import { AppDispatch, useAppDispatch } from 'store/index'
import { colneGraphQLSdk } from 'graphql/client'
import {
  AddIdolMutationVariables,
  GetIdolDetailsForChekiAddQueryVariables,
  GetIdolQueryVariables,
  GetUserCreatedIdolListQueryVariables,
} from 'graphql/generated/client'
import { idolSlice } from 'store/idol/idolStore'
import { nonNullable } from 'utils/array'
import { mapAisuExceptionToColneExceptionAndThrow } from 'exceptions/graphql-exceptions'

export async function addIdol(
  dispatch: AppDispatch,
  params: AddIdolMutationVariables,
  headers?: Record<string, string>
) {
  const idol = await colneGraphQLSdk.AddIdol(params, headers)
  await dispatch(
    idolSlice.actions.updateOrAddIdol({ ...idol.idol.addIdol, groups: [] })
  )
  return idol.idol.addIdol
}

export function useAddIdol() {
  const dispatch = useAppDispatch()
  return function (params: AddIdolMutationVariables) {
    return addIdol(dispatch, params)
  }
}

export async function getIdol(
  dispatch: AppDispatch,
  params: GetIdolQueryVariables,
  headers?: Record<string, string>
) {
  try {
    const idol = await colneGraphQLSdk.GetIdol(params, headers)
    await dispatch(
      idolSlice.actions.updateOrAddIdol({
        ...idol.getIdol,
        groups: idol.getIdol.groups.filter(nonNullable),
      })
    )
  } catch (e) {
    mapAisuExceptionToColneExceptionAndThrow(e)
  }
}

export function useGetIdol() {
  const dispatch = useAppDispatch()
  return function (params: GetIdolQueryVariables) {
    return getIdol(dispatch, params)
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

export async function getIdolForChekiAdd(
  dispatch: AppDispatch,
  params: GetIdolDetailsForChekiAddQueryVariables,
  headers?: Record<string, string>
) {
  const idol = await colneGraphQLSdk.GetIdolDetailsForChekiAdd(params)
  await dispatch(
    idolSlice.actions.updateOrAddIdolForChekiAdd({
      ...idol.getIdol,
      groups: idol.getIdol.groups.filter(nonNullable),
    })
  )
}

export function useGetIdolForChekiAdd() {
  const dispatch = useAppDispatch()
  return function (params: GetIdolDetailsForChekiAddQueryVariables) {
    return getIdolForChekiAdd(dispatch, params)
  }
}
