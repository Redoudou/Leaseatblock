import React, {useState, useEffect, useContext} from "react"

import {Redirect, withRouter, Route, Link} from 'react-router-dom'
import {CircularProgress, Button, TextField, Typography, Grid, Select, FormHelperText, FormControl, MenuItem} from '@material-ui/core'

import {makeStyles } from '@material-ui/styles'

import {FirebaseAuthContext, ProtectedScreen} from '../../context/FirebaseContext'
import Firebase, {addUser, isUser} from '../../firebase'

import styles from './styles/OnBoard'

const useStyles = makeStyles(styles)

const ToLogin = () => {
  return <Redirect to='/login'/>
}

const ToDashboard = () => {
  return <Redirect to='/dashboard'/>
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
    if (!context.isUserSignedIn) {
      ToLogin()
    }
    if (isUser(context.userID)) {
      setOn(true)
    }
  })

  const appendUser = () => {
    let data = {
      fullName: name,
      phoneNumber: phone,
      userType: role,
      kaleido: '',
      isConfirmed: false
    }
    addUser(context.userID, data)

    setOn(true)
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
        <Grid container spacing={5} direction='column' justify='space-around' alignItems='baseline'>
          <Grid item>
            <Typography variant='h3' color='primary'>Finish your profile</Typography>
            <Typography color='error'>{error.message}</Typography>     
          </Grid>    
          <Grid item>
            <FormControl>
              <TextField
                id="standard-full-width"
                fullWidth
                value={name}
                placeholder="Full Name"
                onChange={handleName}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <TextField
                fullWidth
                value={phone}
                placeholder="Phone"
                onChange={handlePhone}
              />
            </FormControl>
          </Grid>
          <Grid item>
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
          <Grid item>
            <Button className={classes.button} variant='contained' color='primary' onClick={appendUser}>Continue</Button>
            <Link to='/logout'>
              <Button className={classes.button} variant='outline' color='primary'>Log Out</Button>
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
          <Typography variant='h3' color='primary'>Finish your profile</Typography>
        </Grid>    
        <Grid item>
          <FormControl>
            <TextField
              id="standard-full-width"
              fullWidth
              value={name}
              placeholder="Full Name"
              onChange={handleName}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              fullWidth
              value={phone}
              placeholder="Phone"
              onChange={handlePhone}
            />
          </FormControl>
        </Grid>
        <Grid item>
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
        <Grid item>
          <Button className={classes.button} variant='contained' color='primary' onClick={appendUser}>Continue</Button>
          <Link to='/logout'>
            <Button className={classes.button} variant='outline' color='primary'>Log Out</Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  )
  
}

export default withRouter(OnBoard)