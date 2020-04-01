import React from 'react'

import {Typography, Grid, Container, Card, Button} from '@material-ui/core'

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
        direction="row"
        justify="center"
        alignItems="center" >
        <Grid item xs={12} sm={5} className={classes.s2}>
          <img className={classes.logo} height='30rem' alt='LeaseOTB' src='https://storage.cloud.google.com/leaseotb-images/purplelogo2x.png' />
          <hr/>
          <Typography variant='h5' className={classes.title1}>
            Helping New York find and keep rent-stablized apartments
          </Typography>
          <Button className={classes.button1} variant='contained' color='secondary' href='REPLACE WITH'>
            <Typography variant='body1' className={classes.buttonT}>
              Learn More
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={7}>
          <img className={classes.china} src='https://storage.cloud.google.com/leaseotb-images/groupwithblocs.png'></img>
        </Grid>
      </Grid>
    </div>
  )
}

export default Landing