import React from 'react'
import {Link, Switch, Router, Route} from 'react-router-dom'

import Landing from '../views/landing/Landing'
import CreateLease from '../views/createLease/CreateLease'
import Lease from '..vewis'


const Routes = () => {
  return (
  
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/lease/:leaseId' component={Lease}/>
      <Route exact path='/createlease' component={CreateLease} />
    </Switch>
        
  )
}

export default Routes