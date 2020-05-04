import React, {Fragment, useContext, useState, useEffect, useCallback} from 'react'
import {
  Badge,
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
  Paper,
  FormControl, 
  InputLabel, 
  InputAdornment,
  Tabs,
  Tab
} from '@material-ui/core'

import GoogleMapReact from 'google-map-react'
import LocationOnIcon from '@material-ui/icons/LocationOn'

import {makeStyles} from '@material-ui/styles'
import {Link, Switch, BrowserRouter as Router, Route, Redirect, withRouter, useRouteMatch, useParams} from 'react-router-dom'
import styles from './styles/Map'
import { mapProps } from 'recompose'

const useStyles = makeStyles(styles)

const lat = 40.723
const lng = -73.977

const InfoWindow = (props) => {
  const { place } = props
  
  const [link, setLink] = useState()

  const infoWindowStyle = {
    position: 'relative',
    bottom: 130,
    width: 220,
    borderRadius: '1em',
    backgroundColor: '#250A3C',
    boxShadow: '0 2px 7px 2px rgba(0, 0, 0, .1)',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
    justifyContent: 'left',
    cursor: 'pointer'
  };

  const sink = (id) => {
    console.log(id)
    setLink(id)
  }

  if (link) {
    return <Redirect push to={`/search/${link}`} />
  }

  return (
    <div style={infoWindowStyle} onClick={() => sink(place.id)}>
      <Grid container direction='row'>
        <Grid item xs={6}>
          <div style={{ fontSize: 14, color: '#CFEBEC' }}>
            {place.streetAddress}
          </div>
          <br/>
          <div style={{ fontSize: 14, color: '#E86D48' }}>
            {place.data}
          </div>
        </Grid>
        <Grid item>
           <img src={place.img} height='60em' alt='img'/>
        </Grid>
      </Grid>

    </div>
  );
};

const Marker = (props) => {

  const [link, setLink] = useState(null)

  const markerStyle = {
    border: '1px solid white',
    borderRadius: '50%',
    height: 15,
    width: 15,
    backgroundColor: props.show ? '#E86D48' : 'blue',
    cursor: 'pointer',
    zIndex: 10,
  };

  const sink = (id) => {
    console.log(id)
    setLink(id)
  }

  if (link) {
    return <Redirect push to={`/search/${link}`} />
  }
  return (
    <Fragment>
      <div style={markerStyle} onClick={() => sink(props.place.id)} />
      {props.show && <InfoWindow place={props.place} />}
    </Fragment>
  );
};

const Map = (props) => {

  const classes = useStyles()

  let list = props.data

  return list ? 
    <div className={classes.root}>
    <Grid container direction='row-reverse'>
      <Grid item sm={12} md={3} xl={2}>
        What
      </Grid>
      <Grid item sm={12} md={9} xl={10} className={classes.map}>
        <GoogleMapReact 
          style={{width: '100%', height: '100%', position: 'relative'}} 
          bootstrapURLKeys={{ 
            key: process.env.REACT_APP_FB_apiKey,
            libraries: ['visualization']
          }}
          defaultCenter={{lat: lat, lng: lng}}
          defaultZoom={10}
        >
        {list.map((place) =>
          (<Marker
            key={place.id}
            lat={place.lat}
            lng={place.long}
            show={true}
            place={place}
          />))}
        </GoogleMapReact>
      </Grid>
      </Grid>
    </div> 
    :
    <div className={classes.root}>
      <CircularProgress/> 
    </div>
}

export default Map