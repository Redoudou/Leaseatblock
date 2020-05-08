import React, {useContext, useState, useEffect} from 'react'
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
import styles from './styles/Search'
import Map from './Map'

const useStyles = makeStyles(styles)

const dataPrep = (data) => {
  let prep = data

  console.log(prep[0])
  return prep
}

const SearchMethod = (props) => {

  const data = props.data
  const mapData = dataPrep(props.data)
  let value = props.value
  const classes = useStyles()

  if (value == 0) {
    return (
      <Map data={mapData}/>
    )
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
            </CardActionArea>
          </Card>
          <Typography variant='h6' color='error'>{property.address}</Typography>
        </Grid>
      ))}
    </div>
  )
}

export default SearchMethod