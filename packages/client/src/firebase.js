
import * as Firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'
import fetch from 'cross-fetch'

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_apiKey,
  authDomain: process.env.REACT_APP_FB_authDomain,
  projectId: process.env.REACT_APP_FB_projectID,
}


Firebase.initializeApp(firebaseConfig)

const db = Firebase.firestore()

export const addUser = (user, data) => {
  db.collection('users').doc(user).set(data)
}

export const isUser = (userID) => {
  if (userID) {
    let ref = db.collection('users')

    let getDoc = ref.doc(userID)
    getDoc.get().then((doc)=> {
      if (!doc.exists) {
        return false
      }
      return true
    }).catch(error => {
      return false
    })
  }
  return false
}

export const addListing = (data) => {
  db.collection('listings').doc().set(data)
}

export const fb = {
  auth: Firebase.auth()
}

export default Firebase