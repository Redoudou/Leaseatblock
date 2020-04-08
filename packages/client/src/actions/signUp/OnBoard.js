import React, {useState, useEffect, useContext} from "react"

import {Redirect, withRouter, Route} from 'react-router-dom'
import {CircularProgress, Button, TextField, Typography, Grid, Select, FormHelperText, FormControl, MenuItem} from '@material-ui/core'

import {makeStyles } from '@material-ui/styles'

import {FirebaseAuthContext, ProtectedScreen} from '../../context/FirebaseContext'
import Firebase, {addUser, isUser} from '../../firebase'

import styles from './styles/SignUp'

const useStyles = makeStyles(styles)

const ToLogin = () => {
  return <Redirect to='/login'/>
}

const OnBoard = () => {
  const classes = useStyles()
  const context = useContext(FirebaseAuthContext)

  const [isOnBoarded, setOn] = useState(false)
  const [error, setError] = useState(null)
  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [role, setRole] = useState('tenant') 

  useEffect(() => {
    if (isUser()) {
      setOn(true)
    }
    if (!context.isUserSignedIn) {
      ToLogin()
    }
  })

  const appendUser = () => {
    let data = {
      created: Firebase.firestore.FieldValue.serverTimestamp(),
      email: context.userObj.email,
      fullName: name,
      phoneNumber: phone,
      userType: role,
    }
    addUser(data)
    .then(() => {
      setOn(true)
      setError(null)
    }).catch( error => {
      setOn(false)
      setError(error)
    })
  }

  const handleName = (event) => {
    setName(event.target.value)
  }
  const handleRole = (event) => {
    setRole(event.target.value)
  }
  const handlePhone = (event) => {
    setPhone(event.target.value)
  }


  if (isOnBoarded === true) {
    return(
      <Redirect to='/dashboard'/>
    )
  } 
  if (isOnBoarded === false && error !== null) {
    return (
      <div className={classes.root}>
          <Grid container alignItems='center' justify='left' direction='column'>
            <Grid item xs={12}>
              <Typography variant='h3' color='primary'>Finish your Profile...</Typography>
              <br />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl>
                <TextField
                  rowsMax="6"
                  value={name}
                  onChange={handleName}
                />
                <FormHelperText>Full Name</FormHelperText>
              </FormControl>
              <br/>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl>
                <Select
                  value={role}
                  onChange={handleRole}
                >
                  <MenuItem value={'tenant'}>Tenant</MenuItem>
                  <MenuItem value={'landlord'}>Landlord</MenuItem>
                  <MenuItem value={'regulator'}>Regulator</MenuItem>
                </Select>
                <FormHelperText>Select your role</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={appendUser}>Continue</Button>
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
        <Typography variant='h3' color='primary'>Finish your Profile...</Typography>
        <br/>
      </Grid>
      <Grid item xs={12} sm={12}>
        <FormControl>
          <TextField
            rowsMax="6"
            value={name}
            onChange={handleName}
          />
          <FormHelperText>Full Name</FormHelperText>
        </FormControl>
        <br/>
      </Grid>
      <Grid item xs={12} sm={12}>
        <FormControl>
          <TextField
            rowsMax="6"
            value={phone}
            onChange={handlePhone}
          />
          <FormHelperText>Phone Number</FormHelperText>
        </FormControl>
        <br/>
      </Grid>
      <Grid item xs={12} sm={12}>
        <FormControl>
          <Select
            value={role}
            onChange={handleRole}
          >
            <MenuItem value={'tenant'}>Tenant</MenuItem>
            <MenuItem value={'landlord'}>Landlord</MenuItem>
            <MenuItem value={'regulator'}>Regulator</MenuItem>
          </Select>
          <FormHelperText>Select your role</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={appendUser}>Continue</Button>
      </Grid>          
    </Grid>
</div>
  )
  
}

export default withRouter(OnBoard)