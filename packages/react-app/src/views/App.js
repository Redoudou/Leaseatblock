import React from 'react'
import { gql, ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

import { useQuery, ApolloProvider } from '@apollo/react-hooks'
import './App.css'


import Layout from './layout/Layout'

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  link: new HttpLink(),
  cache: new InMemoryCache()
})

const GET_TRANSFERS = gql`
{
  transfers (first: 10) {
    id
    from
    to
    value
  }
}
`;


function App() {
  const { loading, error, data } = useQuery(GET_TRANSFERS);
  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, error, data]);

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Layout />
      </ApolloProvider>
    </div>
  );
}

export default App;
