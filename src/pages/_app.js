import 'bootstrap/dist/css/bootstrap.css' // Add this line
import 'react-toastify/dist/ReactToastify.css'
import './public/css/landing.css'
import React from 'react'
import { ToastContainer } from 'react-toastify'
function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <ToastContainer />
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp
