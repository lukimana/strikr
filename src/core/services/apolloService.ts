import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://172.245.142.218:5000/graphql',
  cache: new InMemoryCache({
    resultCaching: true,
  }),
  ssrMode: typeof window === 'undefined',
})

export default client