import React, {useContext, useState, useEffect} from 'react'

import ProtectedScreen, {FirebaseAuthContext} from '../../context/FirebaseContext'
import Firebase, {isUser} from '../../firebase'

import {Container, Grid, Typography, Button, CircularProgress} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {Link, Switch, BrowserRouter, Route, Redirect, withRouter} from 'react-router-dom'

import styles from './styles/Dashboard'


const useStyles = makeStyles(styles)

const Dashboard = () => {
  const classes = useStyles()

  const context = useContext(FirebaseAuthContext)

  const login = () => {
    setTimeout(() => {
      return (
        <Redirect to='/login' />
      )
    })
  }

  const newUser = () => {
    return <Redirect to='/newuser' />
  }

  useEffect(() => {
    if (!context.isUserSignedIn) {
      login()
    }
    if (!isUser) {
      newUser()
    }
  })

  return (
    <div className={classes.root}>
    <ProtectedScreen>
    </ProtectedScreen>
    </div>
  )
}

export default withRouter(Dashboard)