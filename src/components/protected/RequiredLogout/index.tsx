//**********************
//* COMPONENT PROTECTED SCREEN THEN LOGIN
//**********************

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../store/store'

interface props {
  children: React.ReactNode
}

function RequiredLogout({ children }: props) {
  const { isLogin } = useSelector((state: RootState) => state.auth)
  const { loading } = useSelector((state: RootState) => state.site)
  const navigate = useNavigate()
  useEffect(() => {
    if (isLogin && !loading) navigate('/')
  }, [isLogin, loading, navigate])

  if (!isLogin && !loading) {
    return <>{children}</>
  }

  return <div className='loading-page'></div>
}

export default RequiredLogout
