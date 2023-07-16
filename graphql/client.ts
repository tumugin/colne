import { GraphQLClient } from 'graphql-request'
import { getSdk } from './generated/client'
import { RequestConfig } from 'graphql-request/src/types'

const graphQLClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_API_BASE_PATH + '/graphql',
  {
    credentials: 'include',
  },
)

/**
 * @deprecated Use createGraphQLSDK instead
 */
export const colneGraphQLSdk = getSdk(graphQLClient)

export function createGraphQLSDK(requestInit: RequestConfig = {}) {
  const graphQLClient = new GraphQLClient(
    process.env.NEXT_PUBLIC_API_BASE_PATH + '/graphql',
    {
      credentials: 'include',
      ...requestInit,
    },
  )
  return getSdk(graphQLClient)
}
