import React from 'react'
import { Route, Link, BrowserRouter } from 'react-router-dom'

import { Grid, Hidden, Typography, AppBar, Toolbar, Tabs, Tab, withStyles} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'


import styles from './styles/Navigation'

const useStyles = makeStyles(styles)

const AltTab = withStyles(() => ({
  root: {
    textTransform: 'none',
    fontSize: '1.4em',
    minWidth: 80,
    '&:hover': {
      color: '#CFEBEC',
      opacity: 1,
    },
    '&$selected': {
      color: '#CFEBEC',
    },
    '&:focus': {
      color: '#CFEBEC',
    },
  },
  selected: {
    indicatorColor: 'white'
  },
}))(props => <Tab disableRipple {...props} />)


const Title = (prop) => {
  const classes = useStyles()

  return (
    <div className={classes.title}>
      <Grid container>
        <Grid item>
            <Link className={classes.logo} to='/'>
              <img height='70em' alt='LeaseOTB' src='https://storage.cloud.google.com/leaseotb-images/aqualogo2x.png' />
            </Link>
        </Grid>
      </Grid>
    </div>
  )
}

const Navigation = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Route render={({ location }) => (
        <AppBar className={classes.toobar} position='fixed' color='primary'>
          <Toolbar>
            <Grid container>
              <Grid item xs={10} sm={9} md={9} lg={9} xl={9}>
                <Title prop={location.pathname} />
              </Grid>
              <Grid item>
                <Tabs indicatorColor='secondary' className={classes.tabs} value={location.pathname}>
                  <AltTab label='About' value='/about' component={Link} to={'/about'} />
                  <AltTab label='FAQ' value='/faq' component={Link} to={'/faq'} />                  
                </Tabs>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      )} />
    </div>
  )

}


export default Navigation