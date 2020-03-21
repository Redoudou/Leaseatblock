import React from 'react'
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Link, Switch, BrowserRouter, Route} from 'react-router-dom'

import styles from './styles/Layout'

import Routes from '../../router/Router'

const useStyles = makeStyles(styles)

const Layout = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <AppBar color='inherit'>
          <Toolbar>

          </Toolbar>
        </AppBar>
        <Routes></Routes>
      </BrowserRouter>
    </div>
  )
}

export default Layout