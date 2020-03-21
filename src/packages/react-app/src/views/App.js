import React from 'react'
import { addresses, abis } from '@project/contracts'
import { gql } from 'apollo-boost'
import { ethers } from 'ethers'
import { useQuery } from '@apollo/react-hooks'
import './App.css'

import {ThemeProvider} from '@material-ui/core/styles'

//non router test
import Layout from './layout/Layout'

const theme = {
  backgroundColor: ''
}

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

async function readOnchainBalance() {
  // Should replace with the end-user wallet, e.g. Metamask
  const defaultProvider = ethers.getDefaultProvider();
  // Create an instance of ethers.Contract
  // Read more about ethers.js on https://docs.ethers.io/ethers.js/html/api-contract.html
  const ceaErc20 = new ethers.Contract(addresses.ceaErc20, abis.erc20, defaultProvider);
  // A pre-defined address that owns some CEAERC20 tokens
  const tokenBalance = await ceaErc20.balanceOf('0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C');
  console.log({ tokenBalance: tokenBalance.toString() });
}

function App() {
  const { loading, error, data } = useQuery(GET_TRANSFERS);

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, error, data]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout></Layout>
        <button onClick={() => readOnchainBalance()} style={{ display: "" }}>
            Read On-Chain Balance
        </button>
      </ThemeProvider>
    </div>
  );
}

export default App;
