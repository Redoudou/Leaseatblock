import React from 'react'

import {Typography, Grid, Container, Card, Button} from '@material-ui/core'
import fetch from 'cross-fetch'
import {makeStyles} from '@material-ui/core/styles'

import styles from './styles/Landing'

const useStyles = makeStyles(styles)

const Landing = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid
        className={classes.c1}
        container
        direction="row-reverse"
        justify="center"
        alignItems="center" >
        <Grid item xs={12} sm={12} md={7}>
          <img className={classes.i1} src='https://storage.cloud.google.com/leaseotb-images/groupwithblocs.png' alt='Block'></img>
        </Grid>
        <Grid item xs={12} sm={12} md={5} className={classes.s1}>
          <img className={classes.logo} height='80rem' alt='LeaseOTB' src='https://storage.cloud.google.com/leaseotb-images/purplelogo2x.png' />
          <div className={classes.purple} />
          <Typography variant='h5' color='primary' className={classes.title1}>
            Helping New York find and keep rent-stablized apartments
          </Typography>
          <Button className={classes.button1} variant='contained' color='primary' href='/about' >
            <Typography variant='body1' color='primary' className={classes.buttonT} >
              Learn More
            </Typography>
          </Button>
          <Button className={classes.button2} variant='contained' color='primary' href='/signup'>Sign Up</Button>

        </Grid>
      </Grid>
        <Grid
          className={classes.c2}
          container
          direction="row"
          justify="center"
          alignItems="center" >
          <Grid item xs={12} sm={12} md={6}>
            <img className={classes.i2} src='https://storage.cloud.google.com/leaseotb-images/pplwithlock.png' alt='block2'></img>
          </Grid>
          <Grid item xs={12} sm={12} md={6} className={classes.s2}>
            <Card raised className={classes.cardBig}>
              <div className={classes.orange} />
              <Typography variant='h4' bold color='secondary' className={classes.title2}>
                What is Lease on the Bloc?
              </Typography>
              <br />
              <Typography variant='body1' color='secondary' className={classes.sub2}>
                A private blockchain designed by the Housing & Community Renewal Agency to track and monitor proper management of rent-controlled aptartments in New York City.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      <div className={classes.background2}>
        <Grid
          className={classes.c2}
          container
          direction="row"
          justify="center"
          alignItems="center" >
          <Grid item xs={12} sm={12} md={12} className={classes.s3}>
            <div className={classes.orange} />
            <Typography variant='h4' color='primary' className={classes.title3}>
              Why Blockchain?
            </Typography>
            <br />
            <Typography variant='h5' color='primary' className={classes.sub3}>
              A private blockchain designed by the Housing & Community Renewal Agency to track and monitor proper management of rent-controlled aptartments in New York City
            </Typography>
          </Grid>
        </Grid>
        <Grid 
          className={classes.c3}
          container
          direction="row"
          justify="left"
          alignItems="left"
        spacing={5} >
          <Grid item xs={11} sm={11} md={5} lg={4}>
            <Card raised className={classes.card}>
              <Typography variant='h4' color='error'>
                Decentralization
              </Typography>
              <br />
              <Typography variant='h5' color='primary'>
                Leases are stored on a peer-to-peer network of tenants, landlords, and housing regulators.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={11} sm={11} md={5} lg={4}>
            <Card raised className={classes.card}>
              <Typography variant='h4' color='error'>
                Consensus
              </Typography>
              <br />
              <Typography variant='h5' color='primary'>
                Leases are stored on a peer-to-peer network of tenants, landlords, and housing regulators.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={11} sm={11} md={5} lg={4}>
            <Card raised className={classes.card}>
              <Typography variant='h4' color='error'>
                Immutability
              </Typography>
              <br />
              <Typography variant='h5' color='primary'>
                Leases are stored on a peer-to-peer network of tenants, landlords, and housing regulators.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Landing