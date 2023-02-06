import { AppDispatch, useAppDispatch } from 'store/index'
import { colneGraphQLSdk } from 'graphql/client'
import {
  AddIdolMutationVariables,
  AddOrUpdateIdolParamsInput,
  GetIdolDetailsForChekiAddQueryVariables,
  GetIdolQueryVariables,
  GetUserCreatedIdolListQueryVariables,
} from 'graphql/generated/client'
import { idolSlice } from 'store/idol/idolStore'
import { nonNullable } from 'utils/array'
import { mapAisuExceptionToColneExceptionAndThrow } from 'exceptions/graphql-exceptions'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'

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
  return useCallback(
    (params: AddIdolMutationVariables) => {
      return addIdol(dispatch, params)
    },
    [dispatch]
  )
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
  return useCallback(
    (params: GetIdolQueryVariables) => {
      return getIdol(dispatch, params)
    },
    [dispatch]
  )
}

export async function updateIdol(
  dispatch: AppDispatch,
  idolId: string,
  params: AddOrUpdateIdolParamsInput,
  headers?: Record<string, string>
) {
  const idol = await colneGraphQLSdk.EditIdol(
    {
      idolId,
      idol: params,
    },
    headers
  )
  await dispatch(
    idolSlice.actions.updateOrAddIdol({
      ...idol.idol.updateIdol,
      groups: idol.idol.updateIdol.groups.filter(nonNullable),
    })
  )
}

export function useUpdateIdol() {
  const dispatch = useAppDispatch()
  return useCallback(
    (idolId: string, params: AddOrUpdateIdolParamsInput) => {
      return updateIdol(dispatch, idolId, params)
    },
    [dispatch]
  )
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
  return useCallback(
    (params: GetUserCreatedIdolListQueryVariables) => {
      return getUserCreatedIdols(dispatch, params)
    },
    [dispatch]
  )
}

export async function getIdolForChekiAdd(
  dispatch: AppDispatch,
  params: GetIdolDetailsForChekiAddQueryVariables,
  headers?: Record<string, string>
) {
  const idol = await colneGraphQLSdk.GetIdolDetailsForChekiAdd(params, headers)
  await dispatch(
    idolSlice.actions.updateOrAddIdolForChekiAdd({
      ...idol.getIdol,
      groups: idol.getIdol.groups.filter(nonNullable),
    })
  )
}

export function useGetIdolForChekiAdd() {
  const dispatch = useAppDispatch()
  return useCallback(
    (params: GetIdolDetailsForChekiAddQueryVariables) => {
      return getIdolForChekiAdd(dispatch, params)
    },
    [dispatch]
  )
}
