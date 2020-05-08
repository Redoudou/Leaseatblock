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
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import SearchMethod from './SearchMethod'
import styles from './styles/Search'


const useStyles = makeStyles(styles)

let lists 

const Filter = (props) => {
  const classes = useStyles()

  const [lowBound, setLow] = useState()
  const [highBound, setHigh] = useState()

  lists = props.data
  const applyFilter = () => {
    lists = props.data
  }
  
  const changeLow = (event, newLow) => {
    console.log(newLow)
    setLow(newLow)
    applyFilter()
  }

  return (
    <div className={classes.filter}>
    </div>
  )
}

const Search = () => {
  const classes = useStyles()

  const context = useContext(FirebaseAuthContext)

  
  const [dataCache, setData] = useState(null)
  const [value, setValue] = useState()

  useEffect(() => {
    setValue(0)
  }, [])

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue)
  }


  return (
    <div className={classes.root}>
      <Grid container justify='flex-start' alignItems='flex-start' direction='row'>
        <Grid item xs={12}>
        </Grid>
        <FirestoreCollection
          path={'listings'}
          >
            { ({error, isLoading, data}) => {
              setData(data)
              if (error) {
                return error.message
              }
              if (isLoading) {
                return <CircularProgress></CircularProgress>
              }
              if (data.length === 0) {
                return <Typography variant='h4' color='error'>No Listings Yet!</Typography>
              }
              
              return (
                <div>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='primary'
                  >
                    <Tab disableRipple icon={<MapIcon/>} value={0}/>
                    <Tab disableRipple icon={<ListIcon/>} value={1}/>
                  </Tabs>
                  <Filter data={dataCache}/>
                  <SearchMethod data={dataCache} value={value}/>
                </div>
              )
            }}
          </FirestoreCollection>
      </Grid>
    </div>
    
  )

}


export default withRouter(Search)