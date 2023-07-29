import { createGraphQLSDK } from 'graphql/client'

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
    cache: 'no-store',
  })
  const user = await sdk.GetCurrentUser(undefined, headers)
  return user.currentUser ?? null
}
