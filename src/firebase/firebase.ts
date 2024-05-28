import { initializeApp } from 'firebase/app'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'

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
if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099')
  connectFirestoreEmulator(db, '127.0.0.1', 8080)
}
export { app, db, auth, analytics }
export const storage = getStorage()
