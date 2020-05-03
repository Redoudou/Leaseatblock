import React, {useContext, useState, useEffect, useCallback} from 'react'
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

import GoogleMapReact from 'google-map-react'

import {makeStyles} from '@material-ui/styles'
import {Link, Switch, BrowserRouter as Router, Route, Redirect, withRouter, useRouteMatch, useParams} from 'react-router-dom'
import styles from './styles/Map'

const useStyles = makeStyles(styles)

const Map = (props) => {

  const classes = useStyles()

  const list = props.data

  return (
    <div className={classes.root}>
      <GoogleMapReact 
        style={{width: '100%', height: '100%', position: 'relative'}} 
        bootstrapURLKeys={{ key: process.env.REACT_APP_FB_apiKey}}
        defaultCenter={{lat: 40.723, lng: -73.977}}
        defaultZoom={11}
      >
      </GoogleMapReact>
    </div>
  )
}

export default Map