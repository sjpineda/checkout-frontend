import 'bootstrap/dist/css/bootstrap.css' // Add this line
import 'react-toastify/dist/ReactToastify.css'
import './public/css/landing.css'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import { CheckoutProvider } from '@/context/checkout'
function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <ToastContainer />
      <CheckoutProvider>
        <Component {...pageProps} />
      </CheckoutProvider>
    </React.Fragment>
  )
}

export default MyApp
