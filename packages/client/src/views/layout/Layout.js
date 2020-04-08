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
    },
    error: {
      main: '#E86D48'
    }
  }
})

const Layout = () => {
  const classes = useStyles()
  const theme = responsiveFontSizes(makeTheme)
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className={classes.secondC}>
            <Navigation/>
            <div className={classes.page}>
              <Route path="/" component={ScrollToTop}/>
              <Routes/>
            </div>
            <div className={classes.cont}>
              <img className={classes.image} src='	
  https://storage.cloud.google.com/leaseotb-images/cubediamond.png'></img>
            </div>
            <Footer/>

          </div>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }
  render() {
    return null
  }
}

export default Layout