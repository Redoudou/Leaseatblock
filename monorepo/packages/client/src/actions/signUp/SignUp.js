import React, {useState, useEffect, useContext} from "react"

import {Redirect, withRouter, Route, Link} from 'react-router-dom'
import {CircularProgress, Button, TextField, Typography, Grid, Select, FormHelperText, FormControl, MenuItem} from '@material-ui/core'

import {makeStyles } from '@material-ui/styles'

import {FirebaseAuthContext} from '../../context/FirebaseContext'

import Firebase from '../../firebase'

import styles from './styles/SignUp'

const useStyles = makeStyles(styles)


const SignUp = () => {
  const classes = useStyles()
  const context = useContext(FirebaseAuthContext)

  const [isLoggedIn, setLogin] = useState()
  const [error, setError] = useState(null)
  const [email, setEmail] = useState()
  const [password, setPass] = useState()
  const [name, setName] = useState()
  const [role, setRole] = useState('tenant') 

  const [user, setUser] = useState()

  useEffect(() => {
    setLogin(context.isUserSignedIn)
  })

  const handleSignup = () => {
    Firebase.auth()
    .createUserWithEmailAndPassword(email, password)
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
      <Redirect to='/newuser'/>
    )
  } 
  if (isLoggedIn === false && error !== null) {
    return (
      <div className={classes.root}>
      <Grid container spacing={5} direction='column' justify='space-around' alignItems='baseline'>
        <Grid item>
          <Typography variant='h3' color='primary'>Register</Typography>
          <Typography color='error'>{error.message}</Typography>     
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
              placeholder="Password"
              type="password"
              onChange={handlePass}
            />
            <FormHelperText>Password must be larger than 6 characters</FormHelperText>
          </FormControl>
        </Grid>
          <Grid item>
            <Button className={classes.button} variant='contained' color='primary' onClick={handleSignup}>Sign Up</Button>
            <Link to='/login'>
              <Button className={classes.button} variant='outline' color='primary'>Log In</Button>
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
          <Typography variant='h3' color='primary'>Register</Typography>
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
              placeholder="Password"
              type="password"
              onChange={handlePass}
            />
            <FormHelperText>Password must be larger than 6 characters</FormHelperText>
          </FormControl>
        </Grid>
          <Grid item>
            <Button className={classes.button} variant='contained' color='primary' onClick={handleSignup}>Sign Up</Button>
            <Link to='/login'>
              <Button className={classes.button} variant='outline' color='primary'>Log In</Button>
            </Link>
          </Grid>
      </Grid>
    </div>
  )
  
}

export default withRouter(SignUp)