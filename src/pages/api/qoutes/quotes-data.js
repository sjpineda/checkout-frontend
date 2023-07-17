import { Client } from '@hubspot/api-client'

export default async function GetQuotes(req, res) {
  let { id } = req.query
  const quoteId = id
  const properties = [
    'hs_create_date',
    'hs_expiration_date',
    'hs_quote_amount',
    'hs_quote_number',
    'hs_status',
    'hs_terms',
    'hs_title',
    'hubspot_owner_id',
  ]
  const propertiesWithHistory = [null]
  const associations = undefined
  const archived = false
  const idProperty = undefined
  const hubspotClient = new Client({ accessToken: process.env.NEXT_APP_HUBSPOTBASE_CLIENT_KEY }) // hs client
  try {
    const apiResponse = await hubspotClient.crm.quotes.basicApi.getById(
      quoteId,
      properties,
      propertiesWithHistory,
      associations,
      archived,
      idProperty
    )
    res.send({ quotes: apiResponse })
  } catch (e) {
    e.message === 'HTTP request failed' ? res.send({ error: e.response }) : res.send({ error: e })
  }
}
