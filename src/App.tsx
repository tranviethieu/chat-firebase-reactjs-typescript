import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/Layouts/Layout/Layout'
import Home from './components/Pages/Home/Home'
import About from './components/Pages/About/About'
import Messager from './components/Pages/Messager/Messager'
import NotFound from './components/Pages/NotFound/NotFound'
import Login from './components/Pages/Auth/Login/Login'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='chat' element={<Messager />} />
      </Route>
      <Route path='403' element={<NotFound />} />
      <Route path='login' element={<Login />} />
      <Route path='*' element={<Navigate to='/403' replace />} />
    </Routes>
  )
}

export default App
