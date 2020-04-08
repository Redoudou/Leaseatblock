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


  return (
    <div className={classes.root}>
    <ProtectedScreen>
      <Grid container>
        <div>yo</div>
      </Grid>
    </ProtectedScreen>
    </div>
  )
}

export default withRouter(Dashboard)