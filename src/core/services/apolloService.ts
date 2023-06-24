import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL + `?timestamp=${new Date()}`,
  cache: new InMemoryCache({
    resultCaching: true,
  }),
  ssrMode: typeof window === 'undefined',
})

export default client