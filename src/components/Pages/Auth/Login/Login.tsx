import * as React from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import firebase from 'firebase/compat/app'
import { auth, db } from '../../../../firebase/firebase'
import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      //Check if the user is new
      const userDocRef = doc(db, 'users', user.uid)
      console.log(getDoc(userDocRef))
      const userDoc = await getDoc(userDocRef)
      console.log(user)
      if (!userDoc.exists()) {
        // User is new, store their data
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          providerId: user?.providerId,
          createdAt: new Date()
        })
        console.log('New user created and data stored in Firestore')
      } else {
        console.log('User already exists in Firestore')
      }
    } catch (error) {
      console.error('Error during Google sign-in: ', error)
    }
  }
  const handleSignup = async () => {
    const auth = getAuth()
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Check if the user is new
      const userDoc = doc(db, 'users', user.uid)
      const docSnapshot = await getDoc(userDoc)

      if (!docSnapshot.exists()) {
        // User is new, store their data
        await setDoc(userDoc, {
          email: user.email,
          createdAt: new Date()
        })
        console.log('New user created and data stored in Firestore')
      } else {
        console.log('User already exists in Firestore')
      }
    } catch (error) {
      console.error('Error signing up: ', error)
    }
  }
  const signInWithFacebook = () => {
    // const provider = new firebase.auth.FacebookAuthProvider()
    // auth
    //   .signInWithPopup(provider)
    //   .then((result) => {
    //     // Đăng nhập thành công, bạn có thể xử lý tiếp theo ở đây
    //     console.log('Facebook sign in success:', result.user)
    //   })
    //   .catch((error) => {
    //     // Xử lý lỗi nếu có
    //     console.error('Facebook sign in error:', error.message)
    //   })
  }

  return (
    <>
      <Grid container spacing={2} direction='row' justifyContent='center' alignItems='center'>
        <Grid item xs={12}>
          <h2 style={{ textAlign: 'center' }}>Login</h2>
        </Grid>
        <Grid item xs={6} sx={{ marginX: 'auto' }}>
          <div style={{ display: 'flex', justifyItems: 'center', flexDirection: 'column', gap: '6px' }}>
            <Button variant='outlined' fullWidth onClick={signInWithGoogle}>
              Đăng nhập bằng Google
            </Button>
            <Button variant='outlined' fullWidth onClick={signInWithFacebook}>
              Đăng nhập bằng Facebock
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default Login
