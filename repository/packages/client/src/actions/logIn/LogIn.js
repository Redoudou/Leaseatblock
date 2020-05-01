import React, {useState, useEffect, useContext} from "react"

import {Redirect, withRouter, Route, Link} from 'react-router-dom'
import {CircularProgress, Button, TextField, Typography, Grid, FormControl, FormHelperText} from '@material-ui/core'

import {makeStyles } from '@material-ui/styles'

import {FirebaseAuthContext} from '../../context/FirebaseContext'

import Firebase from '../../firebase'

import styles from './styles'

const useStyles = makeStyles(styles)


const LogIn = () => {
  const classes = useStyles()
  const context = useContext(FirebaseAuthContext)

  const [isLoggedIn, setLogin] = useState()
  const [error, setError] = useState(null)
  const [email, setEmail] = useState()
  const [password, setPass] = useState()



  useEffect(() => {
    if (context.isUserSignedIn) {
      setLogin(true)
    }
  })

  const handleLogin = () => {
    Firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then( result => {
      setLogin(true)
      setError(null)
    }).catch( error => {
      setLogin(false)
      setError(error)
    })
  }

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }
  const handlePass = (event) => {
    setPass(event.target.value)
  }


  if (isLoggedIn === true) {
    return(
      <Redirect to='/search'/>
    )
  } 
  if (isLoggedIn === false && error !== null) {
    return (
      <div className={classes.root}>
        <Grid container spacing={5} direction='column' justify='space-around' alignItems='baseline'>
          <Grid item>
            <Typography  variant='h3' color='primary'>Welcome Back</Typography>
            <br/>
          </Grid>      
          <Typography color='error'>{error.message}</Typography>
          <Grid item>
            <FormControl>
              <TextField
                id="standard-full-width"
                fullWidth
                value={email}
                placeholder="Email"
                onChange={handleEmail}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <TextField
                fullWidth
                value={password}
                placeholder="Password"
                type="password"
                onChange={handlePass}
              />
              <FormHelperText>Password must be larger than 6 characters</FormHelperText>
            </FormControl>
          </Grid>
            <Grid item>
              <Button className={classes.button} variant='contained' color='primary' onClick={handleLogin}>Log in</Button>
              <Link to='/signup'>
                <Button className={classes.button} variant='outline' color='primary'>Sign Up</Button>
              </Link>
            </Grid>
        </Grid>
      </div>
    )
  } 

  return (
    <div className={classes.root}>
      <Grid container spacing={5} direction='column' justify='space-around' alignItems='baseline'>
        <Grid item>
          <Typography  variant='h3' color='primary'>Welcome Back</Typography>
          <br/>
        </Grid>      
        <Grid item>
          <FormControl>
            <TextField
              id="standard-full-width"
              fullWidth
              value={email}
              placeholder="Email"
              onChange={handleEmail}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              fullWidth
              value={password}
              type="password"
              placeholder="Password"
              onChange={handlePass}
            />
          </FormControl>
        </Grid>
          <Grid item>
            <Button className={classes.button} variant='contained' color='primary' onClick={handleLogin}>Log in</Button>
            <Link to='/signup'>
              <Button className={classes.button} variant='outline' color='primary'>Sign Up</Button>
            </Link>
          </Grid>
      </Grid>
    </div>
  )
  
}

export default withRouter(LogIn)