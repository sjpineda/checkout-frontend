import { Formik, Form, Field, ErrorMessage } from 'formik'
import { InitialeState, ValidateCardSchema } from '../../components/validations/card/index'
import React, { useEffect, useState } from 'react'
import Loading from '@/pages/loading'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import Select from 'react-select'
// import DatePicker from 'react-bootstrap-date-picker';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  `pk_test_51J308XAhU6l4hvyfwh3RYZLcTxHmXuXrRwtlu032gGVnfTGsOS16sdjT79xKTZBjwtF2JOsSqAuu2UfcaLjeFSgf00TlSK6Sya`
)
export default function PaymentCard(props) {
  const [clientSecret, setClientSecret] = useState('')
  // const stripe = useStripe()
  // const elements = useElements()
  const options = {
    clientSecret: 'pi_3NctCMAhU6l4hvyf17MEXEXa_secret_JuE14yqg2uxZmEPVbZWmNCvyV',
  }
  const router = useRouter()
  const [loading, setLoading] = useState()
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState({})

  let { id } = router.query

  useEffect(() => {
    fetch('https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code')
      .then(response => response.json())
      .then(data => {
        setCountries(data.countries)
        setSelectedCountry(data.userSelectValue)
      })
  }, [])

  const handleSubmit = async values => {
    const res = await fetch(`/api/prices/${props.quoteId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceInCents: props.totalPriceCents,
      }),
    })
    const data = await res.json()
    setClientSecret(data.client_secret)
    await router.push(`/checkout/${data.client_secret}/${data.quoteId}`)
    // window.location.href = data.url
  }

  if (loading) {
    return <Loading active={loading} />
  }
  const handleSubmitForm = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    // if (!stripe || !elements) {
    //   // Stripe.js hasn't yet loaded.
    //   // Make sure to disable form submission until Stripe.js has loaded.
    //   return
    // }
    //
    // const { error } = await stripe.confirmPayment({
    //   //`Elements` instance that was used to create the Payment Element
    //   elements,
    //   confirmParams: {
    //     return_url: 'https://example.com/order/123/complete',
    //   },
    // })
  }
  const style = {
    fieldHeight: {
      border: '0',
      borderBottom: '1px solid #ccc',
      borderRadius: '0',
      padding: '4px 15px 4px 0',
      marginTop: '0',
    },
  }

  return (
    <div className="">
      <div className="d-flex justify-content-center checkout-form">
        <Formik
          initialValues={InitialeState}
          // validationSchema={ValidateCardSchema}
          onSubmit={values => {
            handleSubmit(values)
          }}>
          <Form>
            <button
              type="submit"
              className="btn btnPrimary justify-content-center align-items-center w-100">
              Go to Checkout ${props.amount}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
