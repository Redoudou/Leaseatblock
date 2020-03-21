import React from 'react'
import {Link, Switch, Router, Route} from 'react-router-dom'

import Landing from '../views/landing/Landing'

const Routes = () => {
  return (
      <Switch>
        <Route path='/'>
          <Landing></Landing>
        </Route>
        <Route path='/login'>
          login
        </Route>
      </Switch>
  )
}

export default Routes