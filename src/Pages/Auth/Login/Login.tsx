import * as React from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import firebase from 'firebase/compat/app'

import { auth, firebaseApp } from '../../../firebase/firebase'
//const fbProvider = app.FaceboockAuthProvider()
function Login() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider).catch((error) => {
      if (error.code === 'auth/popup-closed-by-user') {
        // Xử lý khi popup bị đóng bởi người dùng
        console.log('Popup closed by user')
        // Hiển thị thông báo cho người dùng
      } else {
        // Xử lý các lỗi khác
        console.error('Error signing in:', error.message)
      }
    })
  }

  const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider()
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // Đăng nhập thành công, bạn có thể xử lý tiếp theo ở đây
        console.log('Facebook sign in success:', result.user)
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error('Facebook sign in error:', error.message)
      })
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
