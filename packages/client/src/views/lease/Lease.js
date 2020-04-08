import React, {useState, useEffect, useContext} from 'react'
import {useParams, Redirect, withRouter} from 'react-router-dom'
import {Typography, Grid, CircularProgress} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {FirestoreDocument} from 'react-firestore'

import Error from '../misc/Error'

import styles from './styles/Lease'

const useStyles = makeStyles(styles)


export const Listing = () => {
  const classes = useStyles()
  const {listID, leaseID} = useParams()

  return (
    <div className={classes.root} >
      <Grid container>
        <Grid item>
          <FirestoreDocument
            path={`lease/${leaseID}`}>
              {({error, isLoading, data}) => {
                if (error) {
                  return error.message
                }
                if (isLoading) {
                  return <CircularProgress></CircularProgress>
                }
                if (data) {
                  return (
                    <div className={classes.result}>
                      {data.address}
                    </div>
                  )
                } else {
                  return <Redirect to='/search'></Redirect>
                }
              }}
            </FirestoreDocument>
        </Grid>
      </Grid>
    </div>
  )
}

export default withRouter(Listing)