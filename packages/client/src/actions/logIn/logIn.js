import React, {useState, useEffect, useContext} from "react"

import {Redirect, withRouter, Route} from 'react-router-dom'
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
    setLogin(context.isUserSignedIn)
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
      <Redirect to='/dashboard'/>
    )
  } 
  if (isLoggedIn === false && error !== null) {
    return (
      <div className={classes.root}>
          <Grid container alignItems='center' justify='center' direction='column'>
            <Grid item xs={12}>
              <Typography variant='h3' color='primary'>Ehhh, not so fast...</Typography>
              <br/>
              <Typography color='error'>{error.message}</Typography>
            </Grid>
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
          </Grid>
      </div>
    )
  } 
  
  return (
    <div className={classes.root}>
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='h3' color='primary'>Welcome Back!</Typography>
        <br/>
      </Grid>      
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
        <Button className={classes.button} variant='contained' color='primary' onClick={handleLogin}>Login</Button>
      </Grid>
    </Grid>


    </div>
  )
  
}

export default withRouter(LogIn)