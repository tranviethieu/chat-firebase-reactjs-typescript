import { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { RootState, store } from '../../../store/store'
import { auth } from '../../../firebase/firebase'
import { setStateLogin, setToken } from '../../../store/reducers/auth'
import { setLoading } from '../../../store/reducers/site'
import { setInfoAccount } from '../../../store/reducers/user'
import { useNavigate } from 'react-router-dom'

interface IRequireAuthProps {
  children: React.ReactNode
}

export default function RequireAuth(props: IRequireAuthProps) {
  const { loading } = useSelector((state: RootState) => state.site)
  const { isLogin } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    console.log(isLogin)
    if (!isLogin && !loading) {
      navigate('/login')
    }
  }, [isLogin, loading, navigate])

  if (isLogin && !loading) {
    return <>{props.children}</>
  }

  return <div className='loading-page'></div>
}
