import React from 'react'

import {ethers} from 'ethers'

import {Link, Switch, BrowserRouter, Route} from 'react-router-dom'

const getUserID = () => {

  const defaultProvider = ethers.getDefaultProvider()

  return defaultProvider
}


const Profile = () => {

  React.useEffect(() => {
    console.log(getUserID())
  })

  return (
    <div>
      <h3>Profile</h3>
    </div>
  )
}

export default Profile