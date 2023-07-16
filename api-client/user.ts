import { AppDispatch } from 'store'
import { createGraphQLSDK } from 'graphql/client'
import { Headers } from 'api-client/types'

const invalidateTag = ['user']

export async function getCurrentUserState(
  dispatch: AppDispatch,
  headers?: Headers,
) {
  const sdk = createGraphQLSDK({
    headers,
    next: { tags: invalidateTag },
  })
  const user = await sdk.GetCurrentUser(undefined, headers)
  return user.currentUser
}
