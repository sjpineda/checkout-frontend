export async function createPayment(quoteId, totalPriceCents) {
  const res = await fetch(`/api/prices/${quoteId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceInCents: totalPriceCents,
    }),
  })
  try {
    const data = await res.json()
    return {
      clientSecret: data.client_secret,
      quoteId: data.quoteId,
    }
  } catch (e) {
    return e
  }
}
