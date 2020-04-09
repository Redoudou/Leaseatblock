import React, {useContext, useState} from 'react'
import { Route, Link, BrowserRouter } from 'react-router-dom'

import ProtectedScreen, {FirebaseAuthContext} from '../../context/FirebaseContext'
import {FirestoreDocument} from 'react-firestore'

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
                justify="flex-start"
                alignItems="center"
                direction='row'
                >
                <Grid item xs={12} sm={12} md={12}>
                  <Title prop={location.pathname} />
                </Grid>
                <Grid container direction='row-reverse'>
                  <Grid className={classes.welcome} item sm={12} md={4} lg={2} container direction='row'>
                    <Link to='/account' style={{textDecoration: 'none'}}>
                        <FirestoreDocument path={`users/${context.userID}`}>        
                        { ({error, isLoading, data}) => {
                          if (error) {
                            return error.message
                          }
                          if (isLoading) {
                            return "loading..."
                          }
                          if (data) {
                            return <Typography color='error' variant='body1'>{data.fullName}</Typography>

                          }
                        }}
                        </FirestoreDocument>
                      <br/>
                    </Link>
                    <div className={classes.button1}>
                      <Link to='/logout' style={{textDecoration: 'none'}}>
                        <Button variant='outlined' size='small' color='secondary'>
                            Log Out
                        </Button>
                      </Link>
                    </div>
                  </Grid>
                  <Grid item sm={12} md={4} lg={3}>
                    <Tabs indicatorColor='secondary' className={classes.tabs} value={location.pathname}>
                      <AltTab label='About' value='/about' component={Link} to={'/about'} />
                      <div className={classes.alinger}/>
                      <AltTab label="Search" value={'/search'} component={Link} to={'/search'}/>
                      <AltTab label="Account" value={`/account`} component={Link} to={`/account`}/>
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
            <Grid container justify='left' alignItems='center' direction='row'>
              <Grid item xs={12} sm={12} md={6} lg={8}>
                <Title prop={location.pathname} />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} container direction='row'>
                <Grid item>
                  <Tabs indicatorColor='secondary' className={classes.tabs} value={location.pathname}>
                    <AltTab label='About' value='/about' component={Link} to={'/about'} />
                    <AltTab label="Search" value={'/search'} component={Link} to={'/search'}/>
                    <AltTab label='Log In' value='/login' component={Link} to={'/login'} />
                  </Tabs>
                </Grid>
                <Grid className={classes.button2} item>
                  <Button className={classes.button} variant='contained' color='secondary' href='/signup'>Register</Button>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      )} />
    </div>   
  )

}


export default Navigation