import React, {useContext, useState} from 'react'
import { Route, Link, BrowserRouter } from 'react-router-dom'

import ProtectedScreen, {FirebaseAuthContext} from '../../context/FirebaseContext'

import { Grid, Button, Hidden, Typography, AppBar, Toolbar, Tabs, Tab, withStyles} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'


import styles from './styles/Navigation'

const useStyles = makeStyles(styles)

const AltTab = withStyles(() => ({
  root: {
    paddingRight: '1em',
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
  const [signOut, setOut] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  if (context.isUserSignedIn) {
    return (
      <div className={classes.root}>
        <Route render={({ location }) => (
          <AppBar className={classes.toobar} position='fixed' color='primary'>
            <Toolbar>
              <Grid 
                container
                justify="right"
                alignItems="center"
                >
                <Grid item xs={12} sm={12} md={8} lg={8} xl={5}>
                  <Title prop={location.pathname} />
                </Grid>
                <Grid container direction='row-reverse'>
                  <Grid item xs={3}>
                    <div className={classes.button1}>
                      <Link to='/logout' style={{textDecoration: 'none'}}>
                        <Button variant='outlined' size='small' color='secondary'>
                            Log Out
                        </Button>
                      </Link>
                    </div>
                  </Grid>
                  
                  <Grid className={classes.welcome} item xs={8}>
                    <Link to='/dashboard' style={{textDecoration: 'none'}}>
                      <Typography color='error' variant='body2'>
                          Hello, {context.userObj.displayName}
                        </Typography>
                    </Link>
                  </Grid>

                  <Grid item xs={6} sm={6} md={12}>
                    <Tabs indicatorColor='secondary' className={classes.tabs} value={location.pathname}>
                        <AltTab label='About' value='/about' component={Link} to={'/about'} />
                        <AltTab label='FAQ' value='/faq' component={Link} to={'/faq'} />
                        <div className={classes.alinger}/>
                        <AltTab label='Dashboard' value='/dashboard' component={Link} to={'/dashboard'} />
                      </Tabs>
                  </Grid>
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