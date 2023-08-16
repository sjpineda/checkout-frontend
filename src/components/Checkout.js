import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { CheckoutForm } from '@/components/CheckoutForm'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useCheckout from '@/context/checkout'
const stripePromise = loadStripe(
  `pk_test_51J308XAhU6l4hvyfwh3RYZLcTxHmXuXrRwtlu032gGVnfTGsOS16sdjT79xKTZBjwtF2JOsSqAuu2UfcaLjeFSgf00TlSK6Sya`
)
export default function Checkout() {
  const { clientSecret } = useCheckout()
  console.log(clientSecret, 'clientSecret')
  const options = {
    clientSecret: clientSecret,
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm quoteId={clientSecret} />
    </Elements>
  )
}