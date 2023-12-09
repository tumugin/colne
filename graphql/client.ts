import { GraphQLClient } from 'graphql-request'
import { getSdk } from './generated/client'
import { RequestConfig } from 'graphql-request/src/types'

export function createGraphQLSDK(requestInit: RequestConfig = {}) {
  const apiBasePath =
    typeof window === 'undefined'
      ? process.env.SSR_API_BASE_PATH
      : process.env.NEXT_PUBLIC_API_BASE_PATH

  const graphQLClient = new GraphQLClient(apiBasePath + '/graphql', {
    credentials: 'include',
    ...requestInit,
  })
  return getSdk(graphQLClient)
}
