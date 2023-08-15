import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { CheckoutForm } from '@/components/CheckoutForm'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
const stripePromise = loadStripe(
  `pk_test_51J308XAhU6l4hvyfwh3RYZLcTxHmXuXrRwtlu032gGVnfTGsOS16sdjT79xKTZBjwtF2JOsSqAuu2UfcaLjeFSgf00TlSK6Sya`
)
export default function Checkout() {
  const router = useRouter()
  const { clientId } = router?.query
  const [testClientId, setClientId] = useState('')
  let options = {}
  console.log('clientid', clientId)
  if (clientId) {
    options = {
      clientSecret: clientId[0],
    }
  }

  useEffect(() => {
    if (router.isReady) {
      const { clientId } = router?.query
      if (clientId) {
        let options = {
          clientSecret: clientId[0],
        }
      }
    }
  }, [router.isReady])

  return (
    router.isReady && (
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm quoteId={clientId[1]} />
      </Elements>
    )
  )
}
