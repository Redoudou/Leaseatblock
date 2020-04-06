import React, {useContext, useState} from 'react'
import { Route, Link, BrowserRouter } from 'react-router-dom'

import ProtectedScreen, {FirebaseAuthContext} from '../../context/FirebaseContext'

import { Grid, Button, Hidden, Typography, AppBar, Toolbar, Tabs, Tab, withStyles} from '@material-ui/core'
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

  const context = useContext(FirebaseAuthContext)
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  if (context.isUserSignedIn.userType) {
    return (
      <div className={classes.root}>
        <Route render={({ location }) => (
          <AppBar className={classes.toobar} position='fixed' color='primary'>
            <Toolbar>
              <Grid 
                container
                justify="center"
                alignItems="center"
                >
                <Grid item xs={10} sm={10} md={5} lg={5} xl={5}>
                  <Title prop={location.pathname} />
                </Grid>
                <Grid item>
                  <Tabs indicatorColor='secondary' className={classes.tabs} value={location.pathname}>
                    <AltTab label='About' value='/about' component={Link} to={'/about'} />
                    <AltTab label='FAQ' value='/faq' component={Link} to={'/faq'} />
                    <AltTab label='Dashboard' value='/dashboard' component={Link} to={'/dashboard'} />
                  </Tabs>
                  <img 
                    className={styles.profilePic} 
                    src={context.isUserSignedIn.userInfo.photoURL} 
                    alt={context.isUserSignedIn.userType} 
                    width="100px" 
                    height="100px" 
                  />
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        )} />
      </div>     
    )
  }
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
                  <Button className={classes.button} variant='contained' color='secondary' href='/login'>Sign Up</Button>
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