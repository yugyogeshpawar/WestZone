import dbConnect from 'src/server/utils/dbConnect'
import UpiTransaction from 'src/server/models/upiTransaction.model'
import Transaction from 'src/server/models/transaction.model'
import User from 'src/server/models/user.model'
import RefIncome from 'src/server/models/refIncome.model'
import authenticate from 'src/server/middlewares/authenticate'

const LEVEL_INCOMES = {
  1: 0.1,
  2: 0.05,
  3: 0.02
}

async function updateLevelIncome(user, amount, level) {
  if (level > 3 || !user.sponsorId) return

  const sponsor = await User.findOne({ username: user.sponsorId })
  if (!sponsor) return

  const income = amount * LEVEL_INCOMES[level]
  sponsor.walletBalance += income
  sponsor.totalEarning += income
  await sponsor.save()

  const refIncome = new RefIncome({
    sponsorId: sponsor.username,
    referredUserId: user.username,
    amount: income,
    investAmount: amount,
    username: user.username,
    level: level,
    status: true
  })
  await refIncome.save()

  await updateLevelIncome(sponsor, amount, level + 1)
}

async function updateTransactionStatus(transactionId, status) {
  const transaction = await Transaction.findByIdAndUpdate(transactionId, { status: status }, { new: true })
  if (status === 'success') {
    const user = await User.findOne({ email: transaction.email })
    if (user) {
      user.walletBalance += transaction.amount
      await user.save()
      await updateLevelIncome(user, transaction.amount, 1)
    }
  }
}

export default async (req, res) => {
  await dbConnect()

  const { method } = req

  switch (method) {
    case 'GET':
      authenticate(req, res, async () => {
        try {
          const transactions = await UpiTransaction.find({}).sort({ transactionDate: -1 })
          res.status(200).json({ success: true, transactions })
        } catch (error) {
          res.status(500).json({ success: false, error: error.message })
        }
      })
      break
    case 'PUT':
      authenticate(req, res, async () => {
        try {
          const { id, action } = req.body
          if (!id || !action) {
            return res.status(400).json({ success: false, error: 'Missing required fields' })
          }

          const transaction = await UpiTransaction.findByIdAndUpdate(id, { status: action }, { new: true })

          // If the action is 'verified', update the level income and transaction status
          if (action === 'verified') {
            const user = await User.findOne({ username: transaction.userName })
            if (user) {
              user.walletBalance += transaction.amount
              await user.save()
              await updateLevelIncome(user, transaction.amount, 1)
            }
          }

          res.status(200).json({ success: true, transaction })
        } catch (error) {
          res.status(500).json({ success: false, error: error.message })
        }
      })
      break
    default:
      res.status(405).end() // Method Not Allowed
      break
  }
}
