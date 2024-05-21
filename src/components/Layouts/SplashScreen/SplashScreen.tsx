import CircularProgress from '@mui/material/CircularProgress'
import clsx from 'clsx'
import { Fragment } from 'react/jsx-runtime'
import styles from './SplashScreen.module.scss'
import { useSelector } from 'react-redux'
import { RootState, store } from '../../../store/store'
import { useEffect } from 'react'
import { setLoading } from '../../../store/reducers/site'
import { getItemStorage, setItemStorage } from '../../../common/func/localStorage'
import { KEY_STORE } from '../../../constants/configs'
import { setStateLogin, setToken } from '../../../store/reducers/auth'
import { setInfoAccount } from '../../../store/reducers/user'
import { auth } from '../../../firebase/firebase'

function SplashScreen() {
  const { token, isLogin } = useSelector((state: RootState) => state.auth)
  const { infoAccount } = useSelector((state: RootState) => state.user)
  const { loading } = useSelector((state: RootState) => state.site)
  useEffect(() => {
    if (!token && !isLogin) {
      const unsubsicbed = auth.onAuthStateChanged((user: any) => {
        if (user) {
          const { displayName, email, phoneNumber, refreshToken, photoURL, uid } = user
          store.dispatch(setToken(refreshToken))
          store.dispatch(setStateLogin(true))
          //store.dispatch(setLoading(true))
          store.dispatch(setInfoAccount({ displayName, email, phoneNumber, photoURL, uid }))
        }
      })
      return () => {
        unsubsicbed()
      }
    }
  }, [token, isLogin])
  useEffect(() => {
    ;(async () => {
      const state = await getItemStorage(KEY_STORE)
      if (!!state) {
        store.dispatch(setToken(state.token))
        store.dispatch(setStateLogin(state.isLogin))
        store.dispatch(setInfoAccount(state.infoAccount))
      }
      store.dispatch(setLoading(false))
    })()
  }, [])
  // Lưu vào localStorage
  useEffect(() => {
    if (!loading) {
      setItemStorage(KEY_STORE, {
        token: token,
        isLogin: isLogin,
        infoAccount: infoAccount
      })
    }
  }, [token, isLogin, loading, infoAccount])
  return (
    <Fragment>
      <div className={clsx(styles.container, { [styles.close]: !loading })}>
        <div className='relative flex justify-center items-center'>
          <CircularProgress />
        </div>
      </div>
    </Fragment>
  )
}

export default SplashScreen
