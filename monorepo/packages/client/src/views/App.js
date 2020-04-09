import React from 'react'

import {FirestoreProvider} from 'react-firestore'
import {FirebaseAuthProvider} from '../context/FirebaseContext'
import './App.css'

import Layout from './layout/Layout'
import ErrorBoundary from '../context/ErrorBoundary'
import Firebase from '../firebase'


function App() {
  return (
    <div className="App">
      <FirestoreProvider firebase={Firebase}>
        <FirebaseAuthProvider>
          <Layout />
        </FirebaseAuthProvider>
      </FirestoreProvider>
    </div>
  );
}

export default App
