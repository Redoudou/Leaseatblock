import React, {useState, useEffect, useContext} from "react"

import {Redirect, withRouter, Route, Link, useParams} from 'react-router-dom'
import {CircularProgress, Button, TextField, Typography, Grid, Select, FormHelperText, FormControl, MenuItem} from '@material-ui/core'

import {makeStyles } from '@material-ui/styles'

import {FirebaseAuthContext, ProtectedScreen} from '../../context/FirebaseContext'
import Firebase, {addUser, isUser, applyLease} from '../../firebase'

import styles from './styles/ApplyLease'

const useStyles = makeStyles(styles)


const ApplyLease = () => {
  const classes = useStyles()
  const context = useContext(FirebaseAuthContext)
  const leaseID = useParams()

  const [isApp, setApp] = useState(false)

  const [prop, setProp] = useState(leaseID)

  useEffect(() => {

  })

  const appendUser = () => {
  
    applyLease(context.userID, prop)

    setApp(true)
  }

  const handleProp = (event) => {
    setProp(event.target.value)
  }

  if (isApp) {
    return <Redirect to='/account'/>
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={5} direction='column' justify='space-around' alignItems='baseline'>
        <Grid item>
          <Typography variant='h3' color='primary'>Confirm Lease Application</Typography>
          <Typography variant='h6' color='primary'>Applying to: {prop.leaseID} as: {context.userID} </Typography>
        </Grid>    
        <Grid item>
          <FormControl>
            <TextField
              id="standard-full-width"
              fullWidth
              value={prop.leaseID}
              placeholder="Enter the listing ID"
              onChange={handleProp}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button className={classes.button} variant='contained' color='primary' onClick={appendUser}>Send Application</Button>
        </Grid>
      </Grid>
    </div>
  )
  
}

export default withRouter(ApplyLease)