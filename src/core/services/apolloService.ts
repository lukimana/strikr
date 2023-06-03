import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://api.strikr.gg',
  cache: new InMemoryCache({
    resultCaching: true,
  }),
  ssrMode: typeof window === 'undefined',
})

export default client