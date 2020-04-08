import React, {useState, useEffect, useContext} from "react"

import {Redirect, withRouter, Route, Link} from 'react-router-dom'
import {CircularProgress, Button, TextField, Typography, Grid, Select, FormHelperText, FormControl, MenuItem} from '@material-ui/core'

import {makeStyles } from '@material-ui/styles'

import {FirebaseAuthContext, ProtectedScreen} from '../../context/FirebaseContext'
import Firebase, {addUser, isUser, addListing} from '../../firebase'

import styles from './styles/CreateListing'

const useStyles = makeStyles(styles)


const CreateListing = () => {
  const classes = useStyles()
  const context = useContext(FirebaseAuthContext)

  const [isComplete, setComp] = useState(false)
  const [error, setError] = useState(null)

  const [address, setAdd] = useState()
  const [img, setImg] = useState()
  const [data, setData] = useState()

  useEffect(() => {
  
  })

  const createLease = () => {
    let pack = {
      address: address,
      img: img,
      data: data,
      owner: context.userID,
      isApproved: false
    }
    addListing(pack)

    setComp(true)
  }

  const handleAdd = (event) => {
    setAdd(event.target.value)
  }
  const handleImg = (event) => {
    setImg(event.target.value)
  }
  const handleData = (event) => {
    setData(event.target.value)
  }


  if (isComplete === true) {
    return(
      <Redirect to='/account'/>
    )
  } 
  if (isComplete === false && error !== null) {
    return (
      <div className={classes.root}>
      <Grid container spacing={5} direction='column' justify='space-around' alignItems='baseline'>
        <Grid item>
          <Typography variant='h3' color='primary'>Create a listing</Typography>
        </Grid>    
        <Grid item>
          <FormControl>
            <TextField
              id="standard-full-width"
              fullWidth
              value={address}
              placeholder="Street Address"
              onChange={handleAdd}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              fullWidth
              value={img}
              placeholder="Image URL"
              onChange={handleImg}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              fullWidth
              value={data}
              placeholder="Property Description"
              onChange={handleData}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button className={classes.button} variant='contained' color='primary' onClick={createLease}>Create</Button>
          <Link to='/account'>
            <Button className={classes.button} variant='outline' color='primary'>Cancel</Button>
          </Link>
        </Grid>
      </Grid>
    </div>
    )
  } 
  
  return (
    <div className={classes.root}>
      <Grid container spacing={5} direction='column' justify='space-around' alignItems='baseline'>
        <Grid item>
          <Typography variant='h3' color='primary'>Create a listing</Typography>
        </Grid>    
        <Grid item>
          <FormControl>
            <TextField
              id="standard-full-width"
              fullWidth
              value={address}
              placeholder="Street Address"
              onChange={handleAdd}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              fullWidth
              value={img}
              placeholder="Image URL"
              onChange={handleImg}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              fullWidth
              value={data}
              placeholder="Property Description"
              onChange={handleData}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button className={classes.button} variant='contained' color='primary' onClick={createLease}>Create</Button>
          <Link to='/account'>
            <Button className={classes.button} variant='outline' color='primary'>Cancel</Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  )
  
}

export default withRouter(CreateListing)
