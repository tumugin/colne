import { createGraphQLSDK } from 'graphql/client'

const invalidateTag = ['user']

export interface CurrentUser {
  userCreatedAt: string
  userEmail?: string | null
  userEmailVerifiedAt?: string | null
  userId: string
  userName: string
  userUpdatedAt: string
}

export async function getCurrentUser(
  headers?: Headers,
): Promise<CurrentUser | null> {
  const sdk = createGraphQLSDK({
    headers,
    next: { tags: invalidateTag },
  })
  const user = await sdk.GetCurrentUser(undefined, headers)
  return user.currentUser ?? null
}
