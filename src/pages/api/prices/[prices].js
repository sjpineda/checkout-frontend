import { NextResponse } from 'next/server'
import { Stripe } from 'stripe'

export default async function getSession(req, res) {
  const { prices } = req.query
  const stripe = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: '2020-08-27',
  })

  const customer = await stripe.customers.list({})
  // const customer = await stripe.customers.create({
  //   name: prices,
  // })
  // const paymentIntent = await stripe.paymentIntents.create({
  //   customer: customer.id,
  //   setup_future_usage: 'off_session',
  //   amount: 1099,
  //   currency: 'usd',
  //   payment_method_types: ['card'],
  // })
  // console.log('paymentIntent', paymentIntent)
  // res.status(200).json({ client_secret: paymentIntent.client_secret })
  // const products = await stripe.products.list({
  //   active: true,
  // })
  // console.log('products', products)
  // let productId = ''
  // let priceId
  // const doesProductExist = products.data.find(product => {
  //   if (product.name === prices) {
  //     console.log('product.id', product)
  //     productId = product.id
  //     return true
  //   }
  //   return false
  // })
  // if (!doesProductExist) {
  //   const price = await stripe.prices.create({
  //     unit_amount: 10999,
  //     currency: 'usd',
  //     product_data: {
  //       name: prices,
  //     },
  //   })
  //   console.log('price', price)
  //   priceId = price.id
  // } else {
  //   const price = await stripe.prices.create({
  //     unit_amount: 10999,
  //     currency: 'usd',
  //     product: productId,
  //   })
  //   priceId = price.id
  // }
  //
  // const session = await stripe.checkout.sessions.create({
  //   mode: 'payment',
  //   success_url: 'https://example.com/success',
  //   cancel_url: `http://localhost:3000/quotes/${prices}`,
  //   line_items: [
  //     {
  //       price: priceId,
  //       quantity: 1,
  //     },
  //   ],
  // })
  //
  // res.status(200).json({ url: session.url })
}
