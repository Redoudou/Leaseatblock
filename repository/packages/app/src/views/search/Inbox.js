
import React, {useEffect, useState, useContext, Suspense} from 'react'

import {CircularProgress} from '@material-ui/core'

import {makeStyles} from '@material-ui/styles'
import {FirebaseAuthContext} from '../../context/FirebaseContext'
import Firebase, {isUser} from '../../firebase'

import styles from './styles/Search'

const useStyles = makeStyles(styles)

const Inbox = () => {
  const classes = useStyles()
  const [isLoading, setLoad] = useState(true)
  const context = useContext(FirebaseAuthContext)


  if (isLoading) {
    return <CircularProgress></CircularProgress>
  } else {
    return (
      <div className={classes.root}>

      </div>
    )  
  }
  
}

export default Inbox