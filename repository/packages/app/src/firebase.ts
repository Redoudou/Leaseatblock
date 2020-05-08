import * as Firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'
import fetch from 'cross-fetch'
import { array } from "fp-ts";



var firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_apiKey,
  authDomain: process.env.REACT_APP_FB_authDomain,
  projectId: process.env.REACT_APP_FB_projectID,
}


Firebase.initializeApp(firebaseConfig)

const db = Firebase.firestore()

export const addUser = (user: any, data: any) => {
  db.collection('users').doc(user).set(data)
}

export const isUser = (userID: any) => {
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

export const applyLease = (userID: any, prop: any) => {
  db.collection('leases').doc(userID).set(prop)
}

export const addListing = (data: any) => {
  db.collection('listings').doc().set(data)
}

export const fb = {
  auth: Firebase.auth()
}

export default Firebase