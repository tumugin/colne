import {
  AddIdolMutationVariables,
  AddOrUpdateIdolParamsInput,
  GetIdolDetailsForChekiAddQueryVariables,
  GetIdolQueryVariables,
  GetUserCreatedIdolListQueryVariables,
  IdolStatus,
  RegulationStatus,
} from 'graphql/generated/client'
import { createGraphQLSDK } from 'graphql/client'
import { mapAisuExceptionToColneExceptionAndThrow } from 'exceptions/graphql-exceptions'

export async function addIdol(
  params: AddIdolMutationVariables,
  headers?: Headers,
) {
  const sdk = createGraphQLSDK({
    headers,
    cache: 'no-store',
  })
  try {
    const idol = await sdk.AddIdol(params, headers)
    return idol.idol.addIdol
  } catch (e) {
    mapAisuExceptionToColneExceptionAndThrow(e)
  }
}

export interface Idol {
  idolCreatedAt: string
  idolId: string
  idolName: string
  idolStatus: IdolStatus
  idolUpdatedAt: string
  userId?: string | null
  groups: Array<{
    groupName: string
    groupId: string
  } | null>
  user?: {
    userId: string
    userName: string
  } | null
}

export async function getIdol(
  params: GetIdolQueryVariables,
  headers?: Headers,
): Promise<Idol> {
  const sdk = createGraphQLSDK({
    headers,
    cache: 'no-store',
  })
  try {
    const idol = await sdk.GetIdol(params, headers)
    return idol.getIdol
  } catch (e) {
    mapAisuExceptionToColneExceptionAndThrow(e)
  }
}

export async function updateIdol(
  idolId: string,
  params: AddOrUpdateIdolParamsInput,
  headers?: Headers,
) {
  const sdk = createGraphQLSDK({
    headers,
    cache: 'no-store',
  })
  try {
    const idol = await sdk.EditIdol(
      {
        idolId,
        idol: params,
      },
      headers,
    )
    return idol.idol.updateIdol
  } catch (e) {
    mapAisuExceptionToColneExceptionAndThrow(e)
  }
}

export interface UserCreatedIdol {
  count: number
  currentPage: number
  pageCount: number
  idols: Array<{
    idolName: string
    idolId: string
    idolStatus: IdolStatus
    userId?: string | null
    idolUpdatedAt: string
    idolCreatedAt: string
    groups: Array<{
      groupName: string
      groupId: string
    } | null>
  }>
}

export async function getUserCreatedIdols(
  params: GetUserCreatedIdolListQueryVariables,
  headers?: Headers,
): Promise<UserCreatedIdol> {
  const sdk = createGraphQLSDK({
    headers,
    cache: 'no-store',
  })
  try {
    const idols = await sdk.GetUserCreatedIdolList(params, headers)
    return idols.currentUserIdols.getIdolsCreatedByUser
  } catch (e) {
    mapAisuExceptionToColneExceptionAndThrow(e)
  }
}

export interface IdolForChekiAdd {
  idolCreatedAt: string
  idolId: string
  idolName: string
  idolStatus: IdolStatus
  idolUpdatedAt: string
  userId?: string | null
  groups: Array<{
    groupName: string
    groupId: string
    regulations: Array<{
      regulationComment: string
      regulationCreatedAt: string
      regulationId: string
      regulationName: string
      regulationStatus: RegulationStatus
      regulationUnitPrice: number
      regulationUpdatedAt: string
    }>
  } | null>
  user?: {
    userId: string
    userName: string
  } | null
}

export async function getIdolForChekiAdd(
  params: GetIdolDetailsForChekiAddQueryVariables,
  headers?: Headers,
): Promise<IdolForChekiAdd> {
  const sdk = createGraphQLSDK({
    headers,
    cache: 'no-store',
  })
  try {
    const idol = await sdk.GetIdolDetailsForChekiAdd(params, headers)
    return idol.getIdol
  } catch (e) {
    mapAisuExceptionToColneExceptionAndThrow(e)
  }
}

export async function deleteIdol(idolId: string, headers?: Headers) {
  const sdk = createGraphQLSDK({
    headers,
    cache: 'no-store',
  })
  try {
    await sdk.DeleteIdol({ id: idolId }, headers)
  } catch (e) {
    mapAisuExceptionToColneExceptionAndThrow(e)
  }
}
