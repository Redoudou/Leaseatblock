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
            <Link className={classes.logo} to='/'>Lease on the Block</Link>
            <Link className={classes.link} to='/about'>About</Link>
            <Link className={classes.link} to='/faq'>FAQ</Link>
            <Link className={classes.link} to='/profile'>Profile</Link>
          </Toolbar>
        </AppBar>
        <div className={classes.page}>
          <Routes></Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default Layout