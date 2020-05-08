import React, {useState, useEffect} from 'react'


import {makeStyles} from '@material-ui/styles'

import styles from './styles/Filter'

const useStyles = makeStyles(styles)

const Filter = (props) => {

  const classes = useStyles()
  const data = props.data
  
  return (
    <div className={classes.root}>

    </div>
  )
}