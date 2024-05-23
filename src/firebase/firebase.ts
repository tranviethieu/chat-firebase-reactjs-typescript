// firebaseConfig.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB2BqToYopYUUiMkyzLlhKCKgyXWO9LIss',
  authDomain: 'chatfirebase-2bb26.firebaseapp.com',
  projectId: 'chatfirebase-2bb26',
  storageBucket: 'chatfirebase-2bb26.appspot.com',
  messagingSenderId: '753230148195',
  appId: '1:753230148195:web:a950cab7c1ff10a3c07e56',
  measurementId: 'G-X10CDZN7S9'
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
// Initialize Firestore
const db = getFirestore(app)

// Initialize Auth
const auth = getAuth(app)

export { app, db, auth, analytics }
