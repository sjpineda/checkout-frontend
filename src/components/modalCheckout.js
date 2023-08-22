import { Fragment, useState } from 'react'
import { Modal } from 'react-bootstrap'
import useCheckout from '@/context/checkout'
import Checkout from '@/components/Checkout'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'

export function ModalCheckout() {
  const { show, handleClose, priceCents, quoteId, setFirstPayment } = useCheckout()
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState(null)

  const isProcessingCheckout = paymentStatus === 'processingPayment'
  const isPaymentSucceeded = paymentStatus === 'succeededPayment'
  const isPaymentFailed = paymentStatus === 'failedPayment'

  const handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()
    // setProcessingCheckout(true)
    setPaymentStatus('processingPayment')
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
      redirect: 'if_required',
    })
    console.log(error)
    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message)
      setPaymentStatus('failedPayment')
    } else {
      if (paymentIntent.status === 'succeeded') {
        await axios.post('/api/firstPayment/', {
          quoteId: quoteId,
        })
        setErrorMessage('Payment status: ' + paymentIntent.status)
        setPaymentStatus('succeededPayment')
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  const handleCancel = () => {
    handleClose()
  }
  const PaymentSucceded = () => {
    return (
      <div>
        <Modal.Body>
          <h1>Payment Succeded</h1>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal.Body>
      </div>
    )
  }

  const MakePayment = () => {
    return (
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <PaymentElement />
          {/*<button className="btn btnPrimary" disabled={!stripe}>*/}
          {/*  Pay {priceCents}*/}
          {/*</button>*/}
          {/* Show error message to your customers */}
          {errorMessage && <div>{errorMessage}</div>}
        </Modal.Body>
        <Modal.Footer>
          <button
            disabled={isProcessingCheckout}
            className="btn btn-secondary"
            onClick={handleCancel}>
            {isPaymentSucceeded ? 'Close' : 'Cancel'}
          </button>
          <button disabled={isProcessingCheckout} className="btn btnPrimary">
            {/*Pay ${priceCents}*/}
            {isProcessingCheckout ? 'Processing...' : 'Pay $' + priceCents}
          </button>
        </Modal.Footer>
      </form>
    )
  }

  return (
    <Fragment>
      <Modal show={show} onHide={handleCancel} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <PaymentElement />
            {/*<button className="btn btnPrimary" disabled={!stripe}>*/}
            {/*  Pay {priceCents}*/}
            {/*</button>*/}
            {/* Show error message to your customers */}
            {errorMessage && <div>{errorMessage}</div>}
          </Modal.Body>
          <Modal.Footer>
            <button
              disabled={isProcessingCheckout}
              className="btn btn-secondary"
              onClick={handleClose}>
              {isPaymentSucceeded ? 'Close' : 'Cancel'}
            </button>
            <button disabled={isProcessingCheckout || isPaymentSucceeded} className="btn btnPrimary">
              {/*Pay ${priceCents}*/}
              {isProcessingCheckout ? 'Processing...' : 'Pay $' + priceCents}
            </button>
          </Modal.Footer>
        </form>{' '}
      </Modal>
    </Fragment>
  )
}
