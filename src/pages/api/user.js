export default function handler(req, res) {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  })
}
