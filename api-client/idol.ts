import {
  AddIdolMutationVariables,
  AddOrUpdateIdolParamsInput,
  GetIdolDetailsForChekiAddQueryVariables,
  GetIdolQueryVariables,
  GetUserCreatedIdolListQueryVariables,
} from 'graphql/generated/client'
import { createGraphQLSDK } from 'graphql/client'
import { mapAisuExceptionToColneExceptionAndThrow } from 'exceptions/graphql-exceptions'
import { Headers } from 'api-client/types'

const invalidateTag = ['cheki', 'group', 'idol']

export async function addIdol(
  params: AddIdolMutationVariables,
  headers?: Headers,
) {
  const sdk = createGraphQLSDK({
    headers,
    next: { tags: invalidateTag },
  })
  try {
    const idol = await sdk.AddIdol(params, headers)
    return idol.idol.addIdol
  } catch (e) {
    mapAisuExceptionToColneExceptionAndThrow(e)
  }
}

export async function getIdol(
  params: GetIdolQueryVariables,
  headers?: Headers,
) {
  const sdk = createGraphQLSDK({
    headers,
    next: { tags: invalidateTag },
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
    next: { tags: invalidateTag },
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

export async function getUserCreatedIdols(
  params: GetUserCreatedIdolListQueryVariables,
  headers?: Record<string, string>,
) {
  const sdk = createGraphQLSDK({
    headers,
    next: { tags: invalidateTag },
  })
  try {
    const idols = await sdk.GetUserCreatedIdolList(params, headers)
    return idols.currentUserIdols.getIdolsCreatedByUser
  } catch (e) {
    mapAisuExceptionToColneExceptionAndThrow(e)
  }
}

export async function getIdolForChekiAdd(
  params: GetIdolDetailsForChekiAddQueryVariables,
  headers?: Headers,
) {
  const sdk = createGraphQLSDK({
    headers,
    next: { tags: invalidateTag },
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
    next: { tags: invalidateTag },
  })
  try {
    await sdk.DeleteIdol({ id: idolId }, headers)
  } catch (e) {
    mapAisuExceptionToColneExceptionAndThrow(e)
  }
}
