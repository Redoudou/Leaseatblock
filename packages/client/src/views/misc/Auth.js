import Firebase from 'firebase/app'
import React from 'react'

import {FirestoreCollection} from 'react-firestore'

class FirebaseAuth extends React.Component {

  state = {
    isLoading: true,
    error: null,
    auth: null,
    isReg: false,
    isTenant: false,
    isLandlord: false,
  }

  componentDidMount() {
    this.unsubscribe = Firebase.auth()
      .onAuthStateChanged(this.handleAuth, this.handleError)
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  getStatus() {
    
  }

  handleAuth = auth => {
    this.setState({
      isLoading: false,
      auth,
      error: null,
    })

    const status = getStatus()

    switch (status) {
      case ('regulator'):
        this.setState({
          isReg: true
        })
        break
      case ('tenant'):
        this.setState({
          isTenat: true
        })
        break
      case ('landlord'):
        this.setState({
          isLandlord: true
        })
        break
      default:
        break
    }
    }
  }

  handleError = error => {
    this.setState({
      isLoading: false,
      auth: null,
      error,
    })
  }

  render() {
    const 
    return (
      this.props.children(this.state)
    )
  }

}

export default FirebaseAuth