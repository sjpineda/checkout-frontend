import { Fragment } from 'react'
import { Modal } from 'react-bootstrap'
import useCheckout from '@/context/checkout'

export function ModalCheckout() {
  const { show, handleClose } = useCheckout()
  return (
    <Fragment>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to checkout?</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn-primary">Checkout</button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
