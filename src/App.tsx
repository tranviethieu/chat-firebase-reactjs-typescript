import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/Layouts/Layout/Layout'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import NotFound from './Pages/NotFound/NotFound'
import Login from './Pages/Auth/Login/Login'
import Chat from './Pages/Chat/Chat'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='chat' element={<Chat />} />
      </Route>
      <Route path='403' element={<NotFound />} />
      <Route path='login' element={<Login />} />
      <Route path='*' element={<Navigate to='/403' replace />} />
    </Routes>
  )
}

export default App
