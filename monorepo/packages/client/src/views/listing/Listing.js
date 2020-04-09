import React, {useState, useEffect, useContext} from 'react'
import {useParams, Redirect, withRouter} from 'react-router-dom'
import {
  Paper,
  Grid,
  TextField, 
  FormControl, 
  InputLabel, 
  InputAdornment,
  Typography,
  CircularProgress,
  Button,
  Card,
  CardActionArea,
  CardMedia
} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {FirestoreDocument} from 'react-firestore'
import {FirebaseAuthContext} from '../../context/FirebaseContext'

import Error from '../misc/Error'

import styles from './styles/Listing'

const useStyles = makeStyles(styles)


export const Listing = () => {
  const classes = useStyles()
  const {listID} = useParams()
  const context = useContext(FirebaseAuthContext)

  console.log(listID)
  console.log(context.userID)

  return (
    <div className={classes.root} >
      <Grid container>
        <Grid item>
          <FirestoreDocument
            path={`listings/${listID}`}>
              {({error, isLoading, data}) => {
                if (error) {
                  return error.message
                }
                if (isLoading) {
                  return <CircularProgress></CircularProgress>
                }
                console.log(data)
                if (data) {
                  return (
                    <div className={classes.result}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant='h3' color='primary'>
                            {data.address}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <img src={data.img}></img>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant={context.isUserSignedIn ? 'contained' : 'disabled'} color='primary' href={`/apply/${listID}`}>Apply</Button>
                      </Grid>

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