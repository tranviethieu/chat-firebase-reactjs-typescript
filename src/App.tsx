import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/Layouts/Layout/Layout'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import NotFound from './Pages/NotFound/NotFound'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import Login from './Pages/Auth/Login/Login'
import LayoutAuth from './components/Layouts/LayoutAuth/LayoutAuth'
import RequireAuth from './components/protected/RequiredAuth'
import RequiredLogout from './components/protected/RequiredLogout'
import Chat from './Pages/Chat/Chat'

const App: React.FC = () => {
  const { isLogin, token } = useSelector((state: RootState) => state.auth)

  // return isLogin && token ? (
  //   <Routes>
  //     <Route
  //       path='/'
  //       element={
  //         <RequireAuth>
  //           <Layout />
  //         </RequireAuth>
  //       }
  //     >
  //       <Route path='/' element={<Home />} />
  //       <Route path='about' element={<About />} />
  //     </Route>
  //     <Route path='403' element={<NotFound />} />
  //     <Route path='*' element={<Navigate to='/403' replace />} />
  //   </Routes>
  // ) : (
  //   <Routes>
  //     <Route
  //       path='/login'
  //       element={
  //         <LayoutAuth>
  //           <Login />
  //         </LayoutAuth>
  //       }
  //     />
  //   </Routes>
  // )
  return (
    <Routes>
      <Route
        path='/'
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='chat' element={<Chat />} />
      </Route>
      <Route path='403' element={<NotFound />} />
      <Route
        path='login'
        element={
          <RequiredLogout>
            <Login />
          </RequiredLogout>
        }
      />
      <Route path='*' element={<Navigate to='/403' replace />} />
    </Routes>
  )
}

export default App
