import React from 'react'
import {Link, Switch, Router, Route} from 'react-router-dom'

import Landing from '../views/landing/Landing'
import About from '../views/about/About'
import FAQ from '../views/faq/FAQ'
import Profile from '../views/profile/Profile'

import CreateLease from '../views/createLease/CreateLease'

import ScrollToTop from './ScrollToTop'


const Routes = () => {
  return (
  
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/about' component={About} />
      <Route exact path='/faq' component={FAQ} />
      <Route exact path='/profile' component={Profile} />

      <Route exact path='/profile/:userID/landlord/createlease' component={CreateLease} />
    </Switch>
        
  )
}

export default Routes