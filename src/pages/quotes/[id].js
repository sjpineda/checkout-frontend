import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '@/pages/loading'
import AuthorizeCreditCard from '@/pages/api/authorizenet/create-payment'
import PaymentCard from '@/pages/card'
import { toast } from 'react-toastify'

function Quotes() {
  const router = useRouter()
  let { id } = router.query
  const [loading, setLoading] = useState(true)
  const [quotes, setQuotes] = useState([])
  const [quotesData, setQuotesData] = useState()

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
      justifyContent: 'center',
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
    prtBannerTitle: { fontSize: '16px', fontWeight: '700', margin: '0 0 10px' },
    prtBannerStrong: { fontSize: '9px', margin: '0 0  1px', fontWeight: '500' },
    prtBannerText: {
      fontSize: '9px',
      marginBottom: '1px',
      color: 'rgba(255, 255, 255, .8)',
    },
    rightContent: {
      border: '1px solid #f2f2f2',
      maxHeight: '80vh',
      overflowY: 'scroll',
      padding: '15px 0',
    },
  }

  const borderCardStyle = {
    card: { border: '1px solid #ccc', padding: '20px', margin: '20px 0' },
    cardTitle: { fontSize: '11px', fontWeight: '700', margin: '0' },
    desc: { fontSize: '10px' },
  }

  const tableCardStyle = {
    heading: { fontSize: '16px', fontWeight: '700', margin: '25px 0 15px' },
    table: { width: '100%' },
    tableHead: { fontSize: '11px', padding: '10px 0' },
    tableTr: { borderTop: '1px solid #f2f2f2', verticalAlign: 'baseline' },
    tableTd: { padding: '12px 0', fontSize: '10px', color: '#555555' },
    tableList: { margin: '5px 0', padding: '0 0 0 10px' },
  }

  return (
    <>
      {loading ? (
        <Loading active={loading} />
      ) : (
        <>
          <div className="row fixed-top" style={style.fixedTop}>
            <div className="">
              <img src="/logo.jpeg" style={style.imageStyle} />
            </div>
          </div>
          <div className="container-lg pt-5 mt-5">
            <div className="row gx-lg-5 flex-md-reverse">
              <div className="col-md-6 col-12 mb-5">
                <h5 className="mb-4">Checkout</h5>
                <PaymentCard
                  amount={quotesData?.totalCost / 2}
                  name={quotesData?.finalResult?.userInfo?.name}
                  phoneNumber={quotesData?.finalResult?.userInfo?.phoneNumber}
                />
              </div>
              <div className="col-md-6 col-12">
                <div style={style.rightContent}>
                  <div style={style.container}>
                    <img src="/logo.jpeg" className="mb-3" style={style.imageStyle} />
                  </div>
                  <div style={style.prtBanner}>
                    <div style={style.container}>
                      <h2 style={style.prtBannerTitle}>
                        {quotesData?.finalResult?.userInfo?.name}
                      </h2>
                      <div className="row">
                        <div className="col-lg-8 col-8 mb-3">
                          <p style={style.prtBannerStrong}>
                            <strong>{quotesData?.finalResult?.userInfo?.name}</strong>
                          </p>
                          <p style={style.prtBannerText}>
                            {quotesData?.finalResult?.userInfo?.email}
                          </p>
                          <p style={style.prtBannerText}>
                            {quotesData?.finalResult?.userInfo?.phoneNumber}
                          </p>
                        </div>
                        <div className="col-lg-3 col-6 mb-3">
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
                              {quotesData?.finalResult?.userInfo?.quoteCreatedAt}
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
                          <h3 style={borderCardStyle.cardTitle}>Comment from</h3>
                          <p style={borderCardStyle.desc}>
                            {quotesData?.finalResult?.userInfo?.comments}
                          </p>
                        </div>
                        <p style={borderCardStyle.desc}>
                          <strong>Address</strong> {quotesData?.finalResult?.userInfo?.address}
                        </p>
                        <div className="d-grid gap-2">
                          <h3 style={borderCardStyle.cardTitle}>Description</h3>
                          <p style={borderCardStyle.desc}>
                            {quotesData?.finalResult?.jobDescription}
                          </p>
                        </div>
                        <div className="d-grid gap-2">
                          <h3 style={borderCardStyle.cardTitle}>Property Description</h3>
                          <p style={borderCardStyle.desc}>
                            {quotesData?.finalResult?.propertyDescription}
                          </p>
                        </div>
                        <i style={borderCardStyle.desc}>
                          <strong>"Note</strong> {quotesData?.finalResult?.bottomDescription}
                        </i>
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
                            <th className="text-right" style={tableCardStyle.tableHead}>
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={tableCardStyle.tableTr}>
                            <td style={tableCardStyle.tableTd}>
                              <div className="grid gap-2">
                                <p>{quotesData?.finalResult?.jobDescription}</p>
                              </div>
                            </td>
                            <td style={tableCardStyle.tableTd} className="text-right">
                              1
                            </td>
                            <td style={tableCardStyle.tableTd} className="text-right">
                              ${quotesData?.totalCost}
                            </td>
                            <td style={tableCardStyle.tableTd} className="text-right">
                              ${quotesData?.totalCost}
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
                            <th style={tableCardStyle.tableHead}></th>
                            <th className="text-right" style={tableCardStyle.tableHead}></th>
                            <th className="text-right" style={tableCardStyle.tableHead}>
                              Total
                              <p className="text-secondary">One time 50% of total</p>
                            </th>
                            <th className="text-right" style={tableCardStyle.tableHead}>
                              ${quotesData?.totalCost / 2}{' '}
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Quotes