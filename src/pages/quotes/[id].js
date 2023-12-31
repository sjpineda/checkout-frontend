import { useRouter } from 'next/router'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Loading from '@/pages/loading'
import AuthorizeCreditCard from '@/pages/api/authorizenet/create-payment'
import PaymentCard from '@/pages/card'
import { toast } from 'react-toastify'
import '../../descStyle.css'
import ReactToPrint from 'react-to-print'
import { ModalCheckout } from '@/components/modalCheckout'
import { createPayment } from '@/services/createPayment'
import useCheckout from '@/context/checkout'
import Checkout from '@/components/Checkout'
function Quotes() {
  const router = useRouter()
  const {
    handleIds,
    handleShow,
    setClientSecret,
    setQuoteId,
    firstPayment,
    setFirstPayment,
  } = useCheckout()
  const componentRef = useRef(null)
  let { id } = router.query
  const [loading, setLoading] = useState(true)
  const [quotes, setQuotes] = useState([])
  const [quotesData, setQuotesData] = useState()
  const str = 'Line 1\nLine 2\nLine 3'
  const formattedStr = quotesData?.finalResult?.bottomDescription.split('\n').map((line, index) => (
    <div style={{ marginTop: '16px', fontSize: '16px' }} key={index}>
      {line}
      <br />
    </div>
  ))
  useEffect(() => {
    if (id) {
      fetchExcelData()
    }
  }, [router.query])

  const fetchExcelData = async () => {
    try {
      let res = await axios.get(`/api/checkout/${id}/`)

      // let res = await axios.get(`http://localhost:8000/submission/${id}`, {
      //   'Content-type': 'application/json; charset=UTF-8',
      //   'Content-Type': 'application/json',
      // })
      console.log('hey', res?.data.finalResult)
      setQuotesData(res?.data)
      let userData = await axios.get(`/api/checkPayment/${id}/`)
      console.log('userData', userData.data)
      setFirstPayment(userData.data?.firstPayment)
      setLoading(false)
    } catch (e) {
      console.log('there was an error', e)
      setLoading(false)
    }
  }

  const style = {
    imageStyle: { height: '45px' },

    fixedTop: {
      padding: '10px 25px',
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'space-between',
    },
    fixedHrTop: {
      width: '99%',
      height: '1px',
      backgroundColor: 'rgb(254, 52, 110)',
      marginTop: '0!important',
      marginBottom: '0!important',
    },
    container: { maxWidth: '80%', margin: 'auto' },
    prtBanner: { background: '#FE346E', padding: '20px 0px', color: '#fff' },
    prtBannerTitle: { fontSize: '24px', fontWeight: '700', margin: '0 0 10px' },
    prtBannerStrong: { fontSize: '16px', margin: '0 0  1px', fontWeight: '500' },
    prtBannerText: {
      fontSize: '14px',
      marginBottom: '1px',
      color: 'rgba(255, 255, 255, .8)',
    },
    rightContent: {
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '32px 0',
      marginBottom: '48px',
    },
    signatureContainer: {
      borderBottom: '1px solid #000',
      padding: '10px',
      width: '300px',
    },
    signature: {
      border: '1px dashed #000',
      height: '50px',
      marginBottom: '10px',
    },
    date: {
      marginBottom: '10px',
    },
    printedName: {},
  }

  const borderCardStyle = {
    card: { border: '1px solid #ccc', borderRadius: '30px', padding: '20px', margin: '20px 0' },
    cardTitle: { fontSize: '16px', fontWeight: '700', margin: '0' },
    desc: { fontSize: '14px' },
  }

  const tableCardStyle = {
    heading: { fontSize: '16px', fontWeight: '700', margin: '25px 0 15px' },
    table: { width: '100%' },
    tableHead: { fontSize: '14px', padding: '10px 16px' },
    tableTotal: { fontSize: '14px', padding: '10px 0px' },

    tableTr: { borderTop: '1px solid #f2f2f2', verticalAlign: 'baseline' },
    tableTd: { padding: '1px 14px', fontSize: '14px', color: '#555555' },
    tableList: { margin: '5px 0', padding: '0 0 0 10px' },
  }

  const [show, setShow] = useState(false)
  const [processingCheckout, setProcessingCheckout] = useState(false)
  const goToCheckout = async () => {
    try {
      setProcessingCheckout(true)
      const res = await createPayment(id, quotesData?.finalPriceCents)
      setClientSecret(res?.clientSecret)
      setQuoteId(id)
      await handleIds(id, res?.clientSecret, quotesData?.totalCost / 2)
      handleShow()
      setProcessingCheckout(false)
    } catch (e) {
      toast.error('There was an error on our side, try again later')
    }
  }
  const handleClose = () => setShow(false)

  return (
    <>
      {loading ? (
        <Loading active={loading} />
      ) : (
        <>
          {/*<ModalCheckout show={show} handleClose={handleClose} handleShow={handleShow} />*/}
          <Checkout />
          <div className="row fixed-top" style={style.fixedTop}>
            <div className="flex flex-row justify-content-between">
              <img src="/logo.jpeg" style={style.imageStyle} />
              <ReactToPrint
                trigger={() => (
                  <button type="submit" className="btn btnPrimary w-12">
                    Print this out!
                  </button>
                )}
                bodyClass={'gap-10'}
                content={() => componentRef.current}
              />
            </div>
          </div>
          <div className="container-lg pt-5 mt-5">


          </div>

          <ComponentToPrint
            ref={componentRef}
            quotesData={quotesData}
            borderCardStyle={borderCardStyle}
            tableCardStyle={tableCardStyle}
            formattedStr={formattedStr}
            style={style}
            id={id}
          />
          <div className="col-md-6 col-12 mb-5 justify-content-center align-content-center container-lg">
            {!firstPayment && (
              <button
                onClick={goToCheckout}
                disabled={processingCheckout}
                type="submit"
                className="btn btnPrimary justify-content-center align-items-center w-100">
                {processingCheckout ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  'Pay Now'
                )}
              </button>
            )}
            {firstPayment && <h1>Payment already made</h1>}
          </div>
        </>
      )}
    </>
  )
}
const ComponentToPrint = React.forwardRef(
  ({ style, tableCardStyle, quotesData, id, borderCardStyle, formattedStr }, ref) => (
    <div ref={ref} className="container-lg">
      <div className="row gx-lg-5 flex-md-reverse">
        <div className="col-md-12 col-12">
          <div style={style.rightContent}>
            <div style={style.container}>
              <img src="/logo.jpeg" className="mb-3" style={style.imageStyle} />
            </div>
            <div style={style.prtBanner}>
              <div style={style.container}>
                <h2 style={style.prtBannerTitle}>{quotesData?.finalResult?.userInfo?.title}</h2>
                <div className="row">
                  <div className="col-lg-8 col-md-2 col-8 mb-3">
                    <p style={style.prtBannerStrong}>
                      <strong>{quotesData?.finalResult?.userInfo?.name}</strong>
                    </p>
                    <p style={style.prtBannerText}>{quotesData?.finalResult?.userInfo?.email}</p>
                    <p style={style.prtBannerText}>
                      {quotesData?.finalResult?.userInfo?.phoneNumber}
                    </p>
                  </div>
                  <div className="col-lg-3 col-md-10 mb-3">
                    <div className="text-right">
                      <p style={style.prtBannerStrong} className="text-nowrap">
                        <strong>Reference: {id}</strong>
                      </p>
                      <p style={style.prtBannerText} className="text-nowrap">
                        <span className="mx-2 font-weight-bold ">Quote created:</span>
                        {quotesData?.finalResult?.userInfo?.quoteCreatedAt}
                      </p>
                      <p style={style.prtBannerText} className="text-nowrap">
                        <span className="mx-2 font-weight-bold">Quote expires:</span>
                        {quotesData?.finalResult?.userInfo?.quoteExpiredAt}
                      </p>
                      <p style={style.prtBannerText} className="text-nowrap">
                        <span className="mx-2 font-weight-bold">Quote created by:</span>
                        {quotesData?.finalResult?.userInfo?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={style.container}>
              <div style={borderCardStyle.card}>
                <div className="d-grid gap-1">
                  <div className="d-grid gap-2">
                    <h3 style={borderCardStyle.cardTitle}>Comment from Sueep</h3>
                    <p style={borderCardStyle.desc}>
                      {/*{quotesData?.finalResult?.userInfo?.comments}*/}
                    </p>
                  </div>

                  <div className="d-grid gap-2">
                    <h3 style={borderCardStyle.cardTitle}>Address</h3>
                    <p style={borderCardStyle.desc}>{quotesData?.finalResult?.userInfo?.address}</p>
                  </div>
                  <div className="d-grid gap-2">
                    <h3 style={borderCardStyle.cardTitle}>Property Description</h3>
                    <p style={borderCardStyle.desc}>
                      {quotesData?.finalResult?.propertyDescription}
                    </p>
                  </div>
                  <div className="d-grid gap-2">
                    <h3 style={borderCardStyle.cardTitle}>Job Description</h3>
                    <p style={borderCardStyle.desc}>{quotesData?.finalResult?.jobDescription}</p>
                  </div>
                  {/*<i style={borderCardStyle.desc}>*/}
                  {/*  /!*<strong>"Note</strong> {quotesData?.finalResult?.bottomDescription}*!/*/}
                  {/*  {formattedStr}*/}
                  {/*</i>*/}
                </div>
              </div>
            </div>

            <div style={style.container}>
              <div className="grid gap-4">
                <h2 style={tableCardStyle.heading}>Products & Services</h2>
                <table style={tableCardStyle.table}>
                  <thead>
                    <tr>
                      <th style={tableCardStyle.tableHead}>Item & Description</th>
                      <th className="text-right" style={tableCardStyle.tableHead}>
                        Quantity
                      </th>
                      <th className="text-right" style={tableCardStyle.tableHead}>
                        Unit Price
                      </th>
                      <th className="text-right totalDesktop" style={tableCardStyle.tableHead}>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={tableCardStyle.tableTr} className="">
                      <td style={tableCardStyle.tableTd}>
                        <div className="grid gap-2">
                          <p>Indoor Paint</p>
                        </div>
                      </td>
                      <td style={tableCardStyle.tableTd} className="text-right">
                        1
                      </td>
                      <td style={tableCardStyle.tableTd} className="text-right">
                        ${quotesData?.totalCost}
                      </td>
                      <td style={tableCardStyle.tableTd} className="text-right totalDesktop">
                        ${quotesData?.totalCost}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <th className="text-right totalMobile" style={tableCardStyle.tableHead}>
                  Total
                </th>
                <td style={tableCardStyle.tableTd} className="text-right totalMobile">
                  ${quotesData?.totalCost}
                </td>
                <p className="col-lg-10 col-md-6 col-sm-10" style={borderCardStyle.desc}>
                  {/*<strong>"Note</strong> {quotesData?.finalResult?.bottomDescription}*/}
                  {formattedStr}
                </p>
                <table style={tableCardStyle.table}>
                  <thead>
                    <tr>
                      <th style={tableCardStyle.tableHead}>Subtotals</th>
                      <th className="text-right" style={tableCardStyle.tableHead}></th>
                      <th className="text-right" style={tableCardStyle.tableHead}></th>
                      <th className="text-right" style={tableCardStyle.tableHead}></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={tableCardStyle.tableTr}>
                      <td style={tableCardStyle.tableTd}>
                        <div className="grid gap-2">
                          <p>One-time subtotal</p>
                        </div>
                      </td>
                      <td style={tableCardStyle.tableTd} className="text-right"></td>
                      <td style={tableCardStyle.tableTd} className="text-right"></td>
                      <td style={tableCardStyle.tableTd} className="text-right">
                        <div className="grid gap-1">
                          <p>${quotesData?.totalCost}</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table style={tableCardStyle.table}>
                  <thead>
                    <tr>
                      <th style={tableCardStyle.tableHead}>Other Fees</th>
                      <th className="text-right" style={tableCardStyle.tableHead}></th>
                      <th className="text-right" style={tableCardStyle.tableHead}></th>
                      <th className="text-right" style={tableCardStyle.tableHead}></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={tableCardStyle.tableTr}>
                      <td style={tableCardStyle.tableTd}>
                        <div className="grid gap-2">
                          <p>7% WBE</p>
                        </div>
                      </td>
                      <td style={tableCardStyle.tableTd} className="text-right"></td>
                      <td style={tableCardStyle.tableTd} className="text-right"></td>
                      <td style={tableCardStyle.tableTd} className="text-right">
                        <div className="grid gap-1">
                          <p>${(quotesData?.totalCost * 0.07).toFixed(3)}</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table style={tableCardStyle.table}>
                  <thead>
                    <tr>
                      <th style={tableCardStyle.tableTotal}></th>
                      <th className="text-right" style={tableCardStyle.tableTotal}></th>
                      <th style={tableCardStyle.tableTotal}>Total</th>
                      <th className="text-right" style={tableCardStyle.tableHead}>
                        {`                ${(
                          quotesData?.totalCost -
                          quotesData?.totalCost * 0.07
                        ).toFixed(2)}`}
                      </th>
                    </tr>
                  </thead>
                </table>
                <h2 style={tableCardStyle.heading}>Signature</h2>
                <div className="flex-container">
                  <div>
                    <div style={style.signatureContainer}></div>
                    Signature
                  </div>
                  <div>
                    <div style={style.signatureContainer}></div>
                    Date
                  </div>
                </div>
                <div style={{ marginTop: '32px' }}>
                  <div style={style.signatureContainer}></div>
                  Printed Name
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
)
export default Quotes
