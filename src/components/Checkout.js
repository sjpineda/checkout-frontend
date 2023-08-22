import { Elements } from '@stripe/react-stripe-js'
import useCheckout from '@/context/checkout'
import { ModalCheckout } from '@/components/modalCheckout'
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

// const loadStripe = () => {
//   return loadStripe(
//     `pk_test_51J308XAhU6l4hvyfwh3RYZLcTxHmXuXrRwtlu032gGVnfTGsOS16sdjT79xKTZBjwtF2JOsSqAuu2UfcaLjeFSgf00TlSK6Sya`
//   )
// }

export default function Checkout() {
  const { clientSecret } = useCheckout()
  const [stripePromise, setStripePromise] = useState(null)
  const options = {
    clientSecret: clientSecret,
  }

  const getStripePromise = async () => {
    let res = await axios.get(`/api/user`)
    const { publishableKey } = await res.data
    setStripePromise(loadStripe(publishableKey))
  }
  useEffect(() => {
    getStripePromise()
    // axios.get('/api/config').then(async res => {
    //   const { publicKey } = await res
    //   console.log(publicKey, 'publicKey')
    //   setStripePromise(loadStripe(publicKey))
    // })
  }, [])
  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={options}>
        <ModalCheckout />
      </Elements>
    )
  )
}
