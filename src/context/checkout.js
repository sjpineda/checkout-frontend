import { createContext, useContext, useMemo, useState } from 'react'

const CheckoutContext = createContext({
  show: false,
  quoteId: null,
  clientSecret: null,
  handleShow: () => {},
  handleClose: () => {},
})

export function CheckoutProvider(props) {
  const [show, setShow] = useState(false)
  const [quoteId, setQuoteId] = useState(null)
  const [clientSecret, setClientSecret] = useState(null)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const memoedValue = useMemo(() => {
    return {
      show,
      quoteId,
      clientSecret,
      handleShow,
      handleClose,
    }
  }, [show, quoteId, clientSecret])

  return <CheckoutContext.Provider value={memoedValue}>{props.children}</CheckoutContext.Provider>
}

export default function useCheckout() {
  const context = useContext(CheckoutContext)
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider')
  }
  return context
}
