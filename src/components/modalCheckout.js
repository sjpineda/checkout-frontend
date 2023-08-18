import { Fragment, useState } from 'react'
import { Modal } from 'react-bootstrap'
import useCheckout from '@/context/checkout'
import Checkout from '@/components/Checkout'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'

export function ModalCheckout() {
  const { show, handleClose, priceCents } = useCheckout()
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState(null)
  const handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const { error } = await stripe.confirmPayment({
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
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }
  return (
    <Fragment>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
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
            <button className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn btnPrimary">Pay ${priceCents}</button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  )
}
