import { GraphQLClient } from 'graphql-request'
import { getSdk } from './generated/client'

const graphQLClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_API_BASE_PATH + '/graphql',
  {
    credentials: 'include',
  }
)

export const colneGraphQLSdk = getSdk(graphQLClient)
