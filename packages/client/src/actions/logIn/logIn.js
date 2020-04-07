import React, {useState, useEffect} from "react"

import {Redirect, withRouter, Route} from 'react-router-dom'
import {CircularProgress} from '@material-ui/core'
import Firebase from '../../firebase'

const LogIn = () => {
  const [isLoggedIn, setLogin] = useState(false)

  let provider = new Firebase.auth.EmailAuthProvider()
  if (Firebase.auth.User) {
    setLogin(true)
  }

  
  useEffect(() => {
    if (isLoggedIn) {
      return
    }
    Firebase.auth()
    .signInWithEmailAndPassword(provider)
    .then( result => {
      setLogin(true)
      console.log(isLoggedIn)
    }).catch( error => {
      setLogin(false)
      console.log(isLoggedIn)
    })
  })
  if (isLoggedIn === true) {
    return(
      <Redirect push to='/dashboard'/>
    )
  } else {
    return (
      <CircularProgress style={{marginTop: '20em'}}/>
    )
  }
}

export default withRouter(LogIn)