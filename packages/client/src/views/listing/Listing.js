import React from 'react'
import {useParams} from 'react-router-dom'
import {FirestoreCollection} from 'react-firestore'
import {Typography, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

import Error from '../misc/Error'

import styles from './styles/Listing'

const useStyles = makeStyles(styles)

const Listing = ({match}) => {
  const classes = useStyles()
  return (
    <div className={classes.root} >
      <FirestoreCollection
        path={'leases/listings'}
        filter={['slug', '==', match.params.slug]}
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

        const list = data[0]

        return (
          <div>

            <Typography variant='h2' className={classes.title}>            
              {list.address}
            </Typography>
          </div>
        )
      }}
      </FirestoreCollection>
    </div>
  )
}


export default Listing