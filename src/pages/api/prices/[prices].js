import { Stripe } from 'stripe'
import prisma from '../../../lib/prisma'
const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: '2020-08-27',
})
export default async function getSession(req, res) {
  const { prices } = req.query
  const { priceInCents } = req.body
  const userExists = await prisma.user.findUnique({
    where: {
      quoteID: prices,
    },
  })
  console.log('userExists', userExists)
  if (!userExists) {
    console.log('got here')
    const customer = await stripe.customers.create({
      name: prices,
    })
    const paymentIntent = await createPaymentIntent(priceInCents, customer.id)
    await prisma.user.create({
      data: {
        quoteID: prices,
        stripeID: customer.id,
        totalPrice: priceInCents / 100,
        payments: priceInCents / 2,
      },
    })
    res.status(200).json({ client_secret: paymentIntent.client_secret, quoteId: prices })
  } else {
    console.log('got here 2')

    const paymentIntent = await createPaymentIntent(userExists.payments, userExists.stripeID)
    res.status(200).json({ client_secret: paymentIntent.client_secret, quoteId: prices })
  }

  // const customer = await stripe.customers.list({})

  // console.log('paymentIntent', paymentIntent)
  // res.status(200).json({ client_secret: paymentIntent.client_secret, quoteId: prices })
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

async function createPaymentIntent(amount, costumer) {
  return await stripe.paymentIntents.create({
    customer: costumer,
    amount: amount,
    currency: 'usd',
    setup_future_usage: 'off_session',
    automatic_payment_methods: {
      enabled: true,
    },
  })
}
