import { createGraphQLSDK } from 'graphql/client'

const invalidateTag = ['csrf']

export async function getCSRFToken(headers?: Headers) {
  const sdk = createGraphQLSDK({
    headers,
    next: { tags: invalidateTag, revalidate: 60 * 60 },
  })
  const csrfToken = await sdk.GetCSRFToken(undefined, headers)
  return csrfToken.getCsrfToken
}
