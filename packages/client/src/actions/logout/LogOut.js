import React, {useState, useEffect, useContext} from "react"

import {Redirect, withRouter, Route} from 'react-router-dom'
import {CircularProgress} from '@material-ui/core'

import {FirebaseAuthContext} from '../../context/FirebaseContext'

import Firebase from '../../firebase'

const LogOut = () => {
  const [isLoggedIn, setLogin] = useState(true)
  const context = useContext(FirebaseAuthContext)

  useEffect(() => {
    if (context.isUserSignedIn) {
      setLogin(true)
    }
    Firebase.auth().signOut()
    .then( () => {
      setLogin(false)
      window.location.reload()
    }).catch((error) => {
      setLogin(true)
    })
  })

  return(
    <Redirect to='/' />
  )
}

export default withRouter(LogOut)