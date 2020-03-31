import React from 'react'
import {AppBar, Toolbar, Typography, Tab, Grid, Tabs} from '@material-ui/core'
import {Link, Switch, BrowserRouter, Route} from 'react-router-dom'

import {ThemeProvider, createMuiTheme, responsiveFontSizes, withStyles, makeStyles} from '@material-ui/core/styles'

import Routes from '../../router/Router'

import styles from './styles/Layout'

import Navigation from './Navigation'
import Footer from './Footer'

const useStyles = makeStyles(styles)

const makeTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#250A3C'
    },
    secondary: {
      main: '#CFEBEC'
    }
  }
})


const Layout = (props) => {
  const classes = useStyles()
  const theme = responsiveFontSizes(makeTheme)

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navigation/>
          <Routes/>
          <Footer/>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default Layout