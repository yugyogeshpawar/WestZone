import dbConnect from 'src/server/utils/dbConnect'
import Transaction from 'src/server/models/transaction.model'
import authenticate from 'src/server/middlewares/authenticate'

export default async (req, res) => {
  await dbConnect()

  const { method } = req

  switch (method) {
    case 'GET':
      authenticate(req, res, async () => {
        try {
          const { email } = req.user

          if (!email) {
            return res.status(400).json({ message: 'email is required' })
          }

          const transactions = await Transaction.find({ email }).lean()

          if (!transactions || transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for this user' })
          }

          res.status(200).json({ transactions })
        } catch (error) {
          console.error('Error details:', error)
          res.status(500).json({ error: 'Error fetching transaction history' })
        }
      })
      break

    default:
      res.status(405).end() // Method Not Allowed
      break
  }
}
