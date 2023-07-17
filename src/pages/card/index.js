import { Formik, Form, Field, ErrorMessage } from 'formik'
import { InitialeState, ValidateCardSchema } from '../../components/validations/card/index'
import React, { useEffect, useState } from 'react'
import Loading from '@/pages/loading'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import Select from 'react-select'
// import DatePicker from 'react-bootstrap-date-picker';

export default function PaymentCard(props) {
  const router = useRouter()
  const [loading, setLoading] = useState()
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState({})

  let { id } = router.query

  useEffect(() => {
    fetch('https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries)
        setSelectedCountry(data.userSelectValue)
      })
  }, [])

  const handleSubmit = async (values) => {
    setLoading(true)
    let res = await axios.post(
      `/api/authorizenet/create-payment?firstName=${props?.name}&lastName=${props?.phoneNumber}&cardNumber=${values.cardNumber}&expirationDate=${values.expirationDate}&cardCode=${values.cardCode}&id=${id}&amount=${props.amount}`
    )
    let { data } = res
    setLoading(false)
    if (data?.response.status) {
      router.push({
        pathname: '/success',
        query: { returnUrl: router.asPath },
      })
      toast.success(data?.response?.description)
    }
  }

  if (loading) {
    return <Loading active={loading} />
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
          onSubmit={(values) => {
            handleSubmit(values)
          }}>
          <Form>
            <div className="row mb-4">
              {/*<div className="col-6 mb-4">*/}
              {/*    <label htmlFor="cardnumber">First Name</label>*/}
              {/*    <Field className="error" style={style.fieldHeight} id="cardnumber" type="text" name="firstName"*/}
              {/*        inputMode="numeric" />*/}
              {/*    <svg id="ccicon" className="ccicon" width="750" height="471" viewBox="0 0 750 471"*/}
              {/*        version="1.1" xmlns="http://www.w3.org/2000/svg"*/}
              {/*        xmlnsXlink="http://www.w3.org/1999/xlink">*/}

              {/*    </svg>*/}
              {/*    <span className="text-danger mt-4"><ErrorMessage name="firstName" /></span>*/}
              {/*</div>*/}
              {/*<div className="col-6 mb-4">*/}
              {/*    <label htmlFor="cardnumber">Last Name</label>*/}
              {/*    <Field className="error" style={style.fieldHeight} id="cardnumber" type="text" name="lastName"*/}
              {/*        inputMode="numeric" />*/}
              {/*    <svg id="ccicon" className="ccicon" width="750" height="471" viewBox="0 0 750 471"*/}
              {/*        version="1.1" xmlns="http://www.w3.org/2000/svg"*/}
              {/*        xmlnsXlink="http://www.w3.org/1999/xlink">*/}

              {/*    </svg>*/}
              {/*    <span className="text-danger mt-4"><ErrorMessage name="lastName" /></span>*/}
              {/*</div>*/}
              <div className="col-12 mb-4">
                <label htmlFor="cardnumber">Card Number</label>
                <Field
                  className="error"
                  style={style.fieldHeight}
                  id="cardnumber"
                  type="text"
                  name="cardNumber"
                  maxLength={16}
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
                <svg
                  id="ccicon"
                  className="ccicon"
                  width="750"
                  height="471"
                  viewBox="0 0 750 471"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"></svg>
                <span className="text-danger mt-4">
                  <ErrorMessage name="cardNumber" />
                </span>
              </div>
              <div className="col-6 mb-4">
                <label htmlFor="expirationdate">Expiration (mmyy)</label>
                <Field
                  style={style.fieldHeight}
                  id="expirationdate"
                  name="expirationDate"
                  maxLength={4}
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
                {/* <DatePicker id="example-datepicker" /> */}
                <span className="text-danger mt-4">
                  <ErrorMessage name="expirationDate" />
                </span>
              </div>
              <div className="col-6 mb-4">
                <label htmlFor="securitycode">Security Code</label>
                <Field
                  style={style.fieldHeight}
                  id="securitycode"
                  type="text"
                  name="cardCode"
                  pattern="[0-9]*"
                  maxLength={3}
                  inputMode="numeric"
                />
                <span className="text-danger mt-4">
                  <ErrorMessage name="cardCode" />
                </span>
              </div>
            </div>
            {/* <h6 className='mb-3'>Billing Address</h6>
                        <div className='row mb-3'>
                            <div className="col-md-6 col-12 mb-2">
                                <label htmlFor="name">First Name</label>
                                <Field style={style.fieldHeight} id="name" name="firstName" maxLength="20" type="text" />
                                <span className="text-danger mt-4"><ErrorMessage name="firstName" /></span>
                            </div>
                            <div className="col-md-6 col-12 mb-2">
                                <label htmlFor="name">Last Name</label>
                                <Field style={style.fieldHeight} id="name" name="lastName" maxLength="20" type="text" />
                                <span className="text-danger mt-4"><ErrorMessage name="lastName" /></span>
                            </div>
                            <div className="col-12 mb-2">
                                <label htmlFor="name">Email</label>
                                <Field style={style.fieldHeight} id="name" name="email" maxLength="20" type="text" />
                                <span className="text-danger mt-4"><ErrorMessage name="email" /></span>
                            </div>
                            <div className="col-md-6 col-12 mb-2">
                                <label htmlFor="name">Country</label>
                                <Select
                                    options={countries}
                                    value={selectedCountry}
                                    onChange={(selectedOption) => setSelectedCountry(selectedOption)}
                                />
                                <span className="text-danger mt-4"><ErrorMessage name="country" /></span>
                            </div>
                            <div className="col-md-6 col-12 mb-2">
                                <label htmlFor="name">ZIP</label>
                                <Field style={style.fieldHeight} id="name" name="ZIP" maxLength="20" type="text" />
                                <span className="text-danger mt-4"><ErrorMessage name="ZIP" /></span>
                            </div>
                            <div className="col-md-6 col-12 mb-2">
                                <label htmlFor="name">Address</label>
                                <Field style={style.fieldHeight} id="name" name="Address" maxLength="20" type="text" />
                                <span className="text-danger mt-4"><ErrorMessage name="Address" /></span>
                            </div>
                            <div className="col-md-6 col-12 mb-2">
                                <label htmlFor="name">Phone</label>
                                <Field style={style.fieldHeight} id="name" name="Phone" maxLength="20" type="text" />
                                <span className="text-danger mt-4"><ErrorMessage name="Phone" /></span>
                            </div>
                            <div className="col-md-6 col-12 mb-2">
                                <label htmlFor="name">City</label>
                                <Field style={style.fieldHeight} id="name" name="City" maxLength="20" type="text" />
                                <span className="text-danger mt-4"><ErrorMessage name="City" /></span>
                            </div>
                            <div className="col-md-6 col-12 mb-2">
                                <label htmlFor="name">State</label>
                                <Field style={style.fieldHeight} id="name" name="State" maxLength="20" type="text" />
                                <span className="text-danger mt-4"><ErrorMessage name="State" /></span>
                            </div>
                        </div> */}
            <button type="submit" className="btn btnPrimary w-100">
              Pay ${props.amount}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
