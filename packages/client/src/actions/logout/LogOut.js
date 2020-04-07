import React, {useState, useEffect} from "react"

import {Redirect, withRouter, Route} from 'react-router-dom'
import {CircularProgress} from '@material-ui/core'
import Firebase from '../../firebase'

const LogOut = () => {
  const [isLoggedIn, setLogin] = useState(true)

  let provider = new Firebase.auth.GoogleAuthProvider()
  if (Firebase.auth.User) {
    setLogin(true)
  }

  
  useEffect(() => {
    if (isLoggedIn) {
      return
    }
    Firebase.auth().signOut()
    .then( () => {
      setLogin(false)
    }).catch((error) => {
      setLogin(true)
    })
  })

  if (isLoggedIn) {
    return (
      <CircularProgress style={{marginTop: '20em'}}/>
    )
  }
  return(
    <Redirect to='/'/>
  )
}

export default withRouter(LogOut)