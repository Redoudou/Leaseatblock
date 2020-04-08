import React, {useState, useEffect, useContext} from "react"

import {Redirect, withRouter, Route} from 'react-router-dom'
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
        <Grid container alignItems='center' justify='left' direction='row'>
          <Grid item xs={12}>
            <Typography variant='h3' color='primary'>Join the Lease on the Bloc Demo!</Typography>
          </Grid>
          <br/>
          <Grid item xs={12} sm={12}>
            <FormControl>
              <TextField
                rowsMax="6"
                value={email}
                onChange={handleEmail}
              />
              <FormHelperText>Email</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl>
              <TextField
                rowsMax="6"
                value={password}
                onChange={handlePass}
              />
              <FormHelperText>Password</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <br/>
            <Button variant='contained' color='primary' onClick={handleSignup}>Sign Up</Button>
          </Grid>   
          <Typography color='error'>{error.message}</Typography>     
        </Grid>
      </div>
    )
  } 

  return (
    <div className={classes.root}>
      <Grid container alignItems='center' justify='left' direction='row'>
        <Grid item xs={12}>
          <Typography variant='h3' color='primary'>Join the Lease on the Bloc Demo!</Typography>
        </Grid>
        <br/>
        <Grid item xs={12} sm={12}>
          <FormControl>
            <TextField
              rowsMax="6"
              value={email}
              onChange={handleEmail}
            />
            <FormHelperText>Email</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl>
            <TextField
              rowsMax="6"
              value={password}
              onChange={handlePass}
            />
            <FormHelperText>Password</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <br/>
          <Button variant='contained' color='primary' onClick={handleSignup}>Sign Up</Button>
        </Grid>        
      </Grid>
    </div>
  )
  
}

export default withRouter(SignUp)