import React from 'react'
import { Grid, Typography, IconButton, Hidden } from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

import TwitterIcon from '@material-ui/icons/Twitter'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'

import styles from './styles/Footer'

const useStyles = makeStyles(styles)

const Footer = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Hidden xsDown>
            <div className={classes.footerPrimary}>
              <img className={classes.logo} height='30em' alt='LeaseOTB' src='https://storage.cloud.google.com/leaseotb-images/purplelogo2x.png' />
            </div>
          </Hidden>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.footerSecondary}>
            <IconButton aria-label='twitter' target='__blank' href='https://twitter.com/LeaseOTB'>
                <TwitterIcon className={classes.social}/>
            </IconButton>
            <IconButton aria-label='github' target='__blank' href='https://github.com/Redoudou/Leaseatblock'>
              <GitHubIcon className={classes.social}/>
            </IconButton>
            <Hidden smUp>
              <Typography className={classes.hidden} variant='body2'>
                &copy;2020 Lease on the Bloc, LLC
              </Typography>
            </Hidden>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}


export default Footer