import React from 'react'
import {FirestoreCollection} from 'react-firestore'
import {Typography, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

import Error from '../misc/Error'

import styles from './styles/ListingList'

const useStyles = makeStyles(styles)

const ListingList = ({match}) => {
  const classes = useStyles()
  return (
    <div className={classes.root} >
      <FirestoreCollection
        path={'leases'}
      >
        { ({error, isLoading, data}) => {
        if (error) {
          return <Error error={error} />
        }

        if (isLoading) {
          return <p>loading...</p>
        }

        if (data.length === 0) {
          return <Error />
        }

        return (
          <div>
            {data.map(listing => (
              <div key={listing.id}>
                <Typography variant='h2' className={classes.title}>            
                  {listing.address}
                </Typography>            
              </div>
            ))}

          </div>
        )
      }}
      </FirestoreCollection>
    </div>
  )
}


export default ListingList