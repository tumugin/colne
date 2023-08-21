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

export async function resetAuth0UserPassword(
  email: string,
  headers?: Headers,
): Promise<void> {
  const sdk = createGraphQLSDK({
    headers,
    cache: 'no-store',
  })
  await sdk.ResetAuth0UserPassword(
    { params: { auth0EmailAddress: email } },
    headers,
  )
}

export async function updateUserName(
  name: string,
  headers?: Headers,
): Promise<void> {
  const sdk = createGraphQLSDK({
    headers,
    cache: 'no-store',
  })
  await sdk.UpdateUserName({ params: { userName: name } }, headers)
}
