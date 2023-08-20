import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL
    }),
    ssrMode: typeof window === 'undefined',
    defaultOptions: {
      query: {
        errorPolicy: 'ignore',
        fetchPolicy: 'no-cache'
      }
    }
  })
})