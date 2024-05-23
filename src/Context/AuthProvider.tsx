import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { auth } from '../firebase/firebase'
import { useLocation, useNavigate } from 'react-router-dom'
import Spinner from '../components/Layouts/Spinner/Spinner'

// Define the shape of the user object
interface User {
  displayName: string | null
  email: string | null
  uid: string | null
  photoURL: string | null
}

// Define the shape of the context
export interface AuthContextType {
  user: User | null
}

// Create the context with an initial value of null
export const AuthContext = createContext<AuthContextType>({ user: null })

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user: any) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user
        setUser({
          displayName,
          email,
          uid,
          photoURL
        })
        setIsLoading(false)
        if (location.pathname === '/login') navigate('/')
        return
      }

      // reset user info
      setUser(null)
      setIsLoading(false)
      navigate('/login')
    })

    // clean function
    return () => {
      unsubscribed()
    }
  }, [navigate])

  return <AuthContext.Provider value={{ user }}>{isLoading ? <Spinner /> : children}</AuthContext.Provider>
}

export default AuthProvider
