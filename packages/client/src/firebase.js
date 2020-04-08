
import * as Firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_apiKey,
  authDomain: process.env.REACT_APP_FB_authDomain,
  projectId: process.env.REACT_APP_FB_projectID,
}


Firebase.initializeApp(firebaseConfig)

const db = Firebase.firestore()

export const addUser = (data) => {
  return db.collection('users').doc('config').add(data)
}
export const isUser = () => {
  if (db.collection('users').doc().get !== null) {
    return true
  }
  return false
}

export const fb = {
  auth: Firebase.auth()
}

export default Firebase