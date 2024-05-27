import { GraphQLClient } from 'graphql-request'
import { getSdk } from './generated/client'

export function createGraphQLSDK(requestInit: ConstructorParameters<typeof GraphQLClient>[1] = {}) {
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
