import { createContext, useContext, useMemo, useState } from 'react'

const CheckoutContext = createContext({
  show: false,
  quoteId: null,
  priceCents: null,
  clientSecret: null,
  handleShow: () => {},
  handleIds: () => {},
  handleClose: () => {},
})

export function CheckoutProvider(props) {
  const [show, setShow] = useState(false)
  const [quoteId, setQuoteId] = useState(null)
  const [clientSecret, setClientSecret] = useState(null)
  const [priceCents, setPriceCents] = useState(null)
  const handleShow = () => {
    setShow(true)
  }

  const handleIds = async (quoteId, clientSecret, priceCents) => {
    setQuoteId(quoteId)
    setClientSecret(clientSecret)
    setPriceCents(priceCents)
  }
  const handleClose = () => setShow(false)

  const memoedValue = useMemo(() => {
    return {
      show,
      quoteId,
      setQuoteId,
      setClientSecret,
      clientSecret,
      handleShow,
      handleIds,
      handleClose,
      priceCents,
    }
  }, [show, quoteId, clientSecret, setQuoteId, handleIds, setClientSecret, priceCents])

  return <CheckoutContext.Provider value={memoedValue}>{props.children}</CheckoutContext.Provider>
}

export default function useCheckout() {
  const context = useContext(CheckoutContext)
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider')
  }
  return context
}
