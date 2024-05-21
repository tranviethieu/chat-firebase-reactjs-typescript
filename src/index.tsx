import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ToastContainer } from 'react-toastify'
import SplashScreen from './components/Layouts/SplashScreen/SplashScreen'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SplashScreen />
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
        <ToastContainer autoClose={3000} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
