import React from 'react'
import {Link, Switch, Router, Route} from 'react-router-dom'

import Landing from '../views/landing/Landing'
import About from '../views/about/About'
import FAQ from '../views/faq/FAQ'

import Profile from '../views/profile/Profile'
import Dashboard from '../views/dashboard/Dashboard'
import Listing from '../views/listing/Listing'
import ListingList from '../views/listing/ListingList'

import LogIn from '../actions/logIn/LogIn'


const Routes = () => {

  return (
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/about' component={About} />
        <Route exact path='/faq' component={FAQ} />

        <Route exact path='/login' component={LogIn} />

        <Route exact path='/profile' component={Profile} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/search' component={ListingList} />
        <Route exact path='/listing/:slug' component={Listing} />

      </Switch>
  )
}

export default Routes