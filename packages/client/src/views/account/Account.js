
import React, {useState, useContext, useEffect, Suspense} from 'react'

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
import SearchIcon from '@material-ui/icons/Search'
import {Redirect, withRouter, useParams, Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/styles'

import {FirebaseAuthContext} from '../../context/FirebaseContext'
import {FirestoreDocument, FirestoreCollection} from 'react-firestore'
import Firebase from '../../firebase'


import styles from './styles/Account'

const useStyles = makeStyles(styles)


const Account = () => {
  const classes = useStyles()
  const userID = useParams()
  const context = useContext(FirebaseAuthContext)

  return (
    <div className={classes.root}>
      <Paper className={classes.page} raised={9}>
        <FirestoreDocument
          path={`users/${context.userID}`}
          >
            { ({error, isLoading, data}) => {
              if (error) {
                return error.message
              }
              if (isLoading) {
                return <CircularProgress></CircularProgress>
              }
              if (data) {
                console.log(data.userType)
                switch (data.userType) {
                  case ('landlord'):
                    return <Landlord />
                  case ('tenant'):
                    return <Tenant />
                  case ('regulator'):
                    return <Regulator />
                  default:
                    return <CircularProgress></CircularProgress>
                }
              }
            }}
        </FirestoreDocument>
      </Paper>
    </div>
  )

}


const Landlord = (props) => {
  const classes = useStyles()
  const context = useContext(FirebaseAuthContext)
  return ( 

      <Grid container direction='column' justify='center' alignItems='stretch'>
        <Grid item spacing={0} container direction='row' justify='flex-start' alignItems='center' >
          <Grid item>
            <Typography variant='h3'>Landlord Profile</Typography>
          </Grid>
          <Grid item container>
            <FirestoreCollection
              path={`listings`}
              >
              { ({error, isLoading, data}) => {
                if (error) {
                  return error.message
                }
                if (isLoading) {
                  return <CircularProgress></CircularProgress>
                }
                if (data.length !== 0) {
                  console.log(data)
                  return (
                    <div>
                      <Grid style={{padding: '1em'}} item xs={4}><Typography variant='h4' color='primary'>Your Listings</Typography></Grid>
                      {data.map(property => (
                        <Grid className={classes.listingContainer} item xs={4} key={property.id}>
                          <Card className={classes.listingCard}>
                            <CardActionArea href={`/listing/${context.userID}/${property.id}`}>
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
                } else {
                  return <Grid item><Typography variant='h5' color='error'>Looks like you haven't added any properties yet.</Typography></Grid>
                }
              }}
            </FirestoreCollection>
            <Grid item xs={12}>
              <Link to={`/createlisting`}>
                <Button variant='outlined' color='primary'>Add a new listing</Button>
              </Link>
            </Grid>
          </Grid>
          

        </Grid>
      </Grid>

  )
}

const Tenant = (props) => {
  const classes = useStyles()
  const context = useContext(FirebaseAuthContext)
  return ( 
      <Grid container direction='column' justify='center' alignItems='stretch'>
        <Grid item>
        
        </Grid>
      </Grid>
  )
}

const Regulator = (props) => {
  const classes = useStyles()
  const context = useContext(FirebaseAuthContext)
  return ( 

      <Grid container direction='column' justify='center' alignItems='stretch'>
        <Grid>
          <Typography variant='h3'>Welcome, {props.name}</Typography>
        </Grid>
      </Grid>
  )
}

export default withRouter(Account)