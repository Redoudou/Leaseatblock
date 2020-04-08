import React, {useContext, useState} from 'react'

import ProtectedScreen, {FirebaseAuthContext} from '../../context/FirebaseContext'


import {Container, Grid, Typography, Button, CircularProgress} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {Link, Switch, BrowserRouter, Route} from 'react-router-dom'

import styles from './styles/Profile'


const useStyles = makeStyles(styles)

const Profile = () => {
  const classes = useStyles()

  const context = useContext(FirebaseAuthContext)
  return (
    <div className={classes.root}>
    <ProtectedScreen>
      <Typography variant='h3'>{context.userObj}</Typography>
    </ProtectedScreen>

    
    </div>
  )
}

export default Profile