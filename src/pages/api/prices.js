import { NextResponse } from 'next/server'
import { Stripe } from 'stripe'

export default async function getSession(req,res) {
  const stripe = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: '2020-08-27',
  })
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
  })
  const price = await stripe.prices.create({
    unit_amount: 1099,
    currency: 'usd',
    product_data: {
      name: 'T-shirt',
    },
  })
  console.log('price', price)
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: 'https://example.com/success',
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
  })

  res.status(200).json({ url: session.url })
}
