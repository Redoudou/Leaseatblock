import React from 'react'
import {Link, Switch, Router, Route} from 'react-router-dom'

import Landing from '../views/landing/Landing'
import About from '../views/about/About'
import FAQ from '../views/faq/FAQ'
import Profile from '../views/profile/Profile'

import CreateLease from '../actions/createLease/CreateLease'

import ScrollToTop from './ScrollToTop'


const Routes = () => {
  return (
  
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/about' component={About} />
      <Route exact path='/faq' component={FAQ} />
      <Route exact path='/profile' component={Profile} />

    </Switch>
        
  )
}

export default Routes