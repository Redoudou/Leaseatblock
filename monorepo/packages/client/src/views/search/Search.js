import React, {useContext, useState, useEffect} from 'react'

import ProtectedScreen, {FirebaseAuthContext} from '../../context/FirebaseContext'
import Firebase, {isUser} from '../../firebase'

import {
  Container, 
  Card,
  CardActionArea,
  CardMedia,
  Grid, 
  Typography, 
  Button, 
  CircularProgress, 
  AppBar, 
  Toolbar, 
  TextField, 
  FormControl, 
  InputLabel, 
  InputAdornment,
  Tabs,
  Tab
} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {Link, Switch, BrowserRouter as Router, Route, Redirect, withRouter, useRouteMatch, useParams} from 'react-router-dom'
import {FirestoreCollection} from 'react-firestore'

import styles from './styles/Search'


const useStyles = makeStyles(styles)

const Search = () => {
  const classes = useStyles()

  const context = useContext(FirebaseAuthContext)

  let {path, url} = useRouteMatch()

  return (
    <div className={classes.root}>
      <Grid container justify='flex-start' alignItems='center'>
        <Typography className={classes.title} variant='h2'>Current Listings</Typography>
        <FirestoreCollection
          path={'listings'}
          >
            { ({error, isLoading, data}) => {
              if (error) {
                return error.message
              }
              if (isLoading) {
                return <CircularProgress></CircularProgress>
              }
              if (data.length === 0) {
                return <Typography variant='h3' color='error'>No Listings Yet!</Typography>
              }
              return (
                <div>
                  {data.map(property => (
                    <Grid className={classes.listingContainer} item xs={12} key={property.id}>
                      <Card className={classes.listingCard}>
                        <CardActionArea href={`/search/${property.id}`}>
                        <CardMedia  
                          className={classes.listingImg}
                          component='img' 
                          image={property.img} 
                          title={property.address}
                          ></CardMedia>                       
                        <Typography variant='h6' color='error'>{property.address}</Typography>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </div>
              )
            }}
          </FirestoreCollection>
      </Grid>
    </div>
    
  )

}


export default withRouter(Search)