import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  const { quoteId } = req.query
  const user = await prisma.user.findUnique({
    where: {
      quoteID: quoteId,
    },
  })
  res.json(user)
}
