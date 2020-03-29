import React from 'react'

import {ethers} from 'ethers'
import Web3 from 'web3'

import {Container, Grid, Typography, Button} from '@material-ui/core'
import {Link, Switch, BrowserRouter, Route} from 'react-router-dom'

var web3 = new Web3(Web3.givenProvider)


const Profile = () => {
  const [isAuth, toggleAuth] = React.useState(false)


  React.useEffect(() => {
    web3.eth.getAccounts(function(err, accounts){
      if (err != null) {
        console.log(err)
      }
      else if (accounts.length === 0) {
        console.log('MetaMask is locked')
      }
      else {
        console.log('MetaMask is unlocked')
        toggleAuth(true)
      }
    })
  })

  if (isAuth) {
    return (
      <div>
        <Container>
          <Grid xs={12} sm={6}>
            <Typography variant='h5'>Welcome {web3.eth.getAccounts()} user!</Typography>
            <Typography variant='h5'>Sign up as an:</Typography>
          </Grid>
          <hr/>
          <Grid xs={12} sm={6}>
            <Grid item>
              <Button>Tenant</Button>
            </Grid>
            <Grid item>
              <Button>Landlord</Button>
            </Grid>
            <Grid item>
              <Button>Regulator</Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
  return (
    <div>
      please login with metamask!
    </div>
  )
}

export default Profile