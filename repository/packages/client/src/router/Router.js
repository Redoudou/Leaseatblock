import React from 'react'
import {Link, Switch, Router, Route} from 'react-router-dom'

import Landing from '../views/landing/Landing'
import About from '../views/about/About'
import FAQ from '../views/faq/FAQ'

import Search from '../views/search/Search'
import Account from '../views/account/Account'

import Listing from '../views/listing/Listing'
import Lease from '../views/lease/Lease'

import ErrorBoundary from '../context/ErrorBoundary'
import LogIn from '../actions/logIn/LogIn'
import LogOut from '../actions/logOut/LogOut'
import SignUp from '../actions/signUp/SignUp'
import OnBoard from '../actions/signUp/OnBoard'
import ApplyLease from '../actions/applyLease/ApplyLease'

const Routes = () => {

  return (
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/about' component={About} />

        <Route exact path='/login' component={LogIn} />
        <Route exact path='/logout' component={LogOut} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/newuser' component={OnBoard} />
        
        <Route exact path='/search' component={Search} />
        <Route exact path='/account' component={Account} />
        <Route exact path='/apply/:leaseID' component={ApplyLease} />
        <Route exact path='/search/:listID' component={Listing} />
        <Route exact path='/search/:listID/:leaseID' component={Lease} />
      </Switch>
  )
}

export default Routes