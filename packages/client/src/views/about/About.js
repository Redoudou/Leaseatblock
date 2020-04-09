import React from 'react'

import {Typography, Grid, Container, Card, Button, CardActionArea} from '@material-ui/core'
import fetch from 'cross-fetch'
import {makeStyles} from '@material-ui/core/styles'

import styles from './styles/About'

const useStyles = makeStyles(styles)

const About= () => {
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
            <img className={classes.i1} src='https://storage.cloud.google.com/leaseotb-images/cubediamond.png' alt='Block'></img>
          </Grid>
          <Grid item xs={12} sm={12} md={5} className={classes.s1}>
            <br />
            <Typography variant='h4' color='primary' className={classes.title1}>
              We are a dedicated group of locals and professionals determined to bring transparency and enforcement to the NYC rental market
            </Typography>
          </Grid>
          <br />
        </Grid>
        <Grid 
          className={classes.c3}
          container
          direction="row"
          justify="left"
          alignItems="left"
          spacing={5} >
          <Grid item xs={12}>
            <Typography variant='h3'>Current Team</Typography>
          </Grid>
          <Grid item xs={11} sm={11} md={5} lg={4}>
            <Card raised className={classes.card}>
              <Typography variant='h4' color='error'>
                Redwan
              </Typography>
              <br />
              <Typography variant='h5' color='primary'>
                Founder         
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={11} sm={11} md={5} lg={4}>
            <Card raised className={classes.card}>
              <Typography variant='h4' color='error'>
                Gael
              </Typography>
              <br />
              <Typography variant='h5' color='primary'>
                UI & Visual Design
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={11} sm={11} md={5} lg={4}>
            <Card raised className={classes.card}>
              <Typography variant='h4' color='error'>
                Zachary
              </Typography>
              <br />
              <Typography variant='h5' color='primary'>
                Technical Lead
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={11} sm={11} md={5} lg={4}>
            <Card raised className={classes.card}>
              <Typography variant='h4' color='error'>
                Peter
              </Typography>
              <br />
              <Typography variant='h5' color='primary'>
                Blockchain Engineer
              </Typography>
            </Card>
          </Grid>
        </Grid>
        <Grid 
          className={classes.c3}
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={10} >
          <Grid item xs={12}>

            <Typography variant='h3'>Technologies and Partners</Typography>
            <div className={classes.purple} />

          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <img className={classes.company} src='https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_e290ef1703a261978df5cb51dc4b8e70/kaleido-blockchain-business-cloud.png'/>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <img className={classes.company} src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1200px-Ethereum-icon-purple.svg.png'/>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <img className={classes.company} src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTYuBsBK9KLBwo3URP4nh8shcDz_Efopas4OQYAq2_rtvMyYO3a&usqp=CAU'/>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <img className={classes.company} src='https://content.consensys.net/wp-content/uploads/open-law-1.png'/>
          </Grid>

        </Grid>

      </div>
  )
}

export default About