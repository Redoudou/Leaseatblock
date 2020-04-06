
import * as Firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_apiKey,
  authDomain: process.env.REACT_APP_FB_authDomain,
  projectId: process.env.REACT_APP_FB_projectID,
}


Firebase.initializeApp(firebaseConfig)

export const fb = {
  auth: Firebase.auth()
}

export default Firebase