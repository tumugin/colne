import { createGraphQLSDK } from 'graphql/client'

export async function getCSRFToken(headers?: Headers) {
  const sdk = createGraphQLSDK({
    headers,
    next: { revalidate: 60 * 60 },
  })
  const csrfToken = await sdk.GetCSRFToken(undefined, headers)
  return csrfToken.getCsrfToken
}
