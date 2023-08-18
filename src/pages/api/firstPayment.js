import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  const { quoteId } = req.body
  const updateUser = await prisma.user.update({
    where: {
      quoteID: quoteId,
    },
    data: {
      firstPayment: true,
    },
  })
  res.send(updateUser)
}
