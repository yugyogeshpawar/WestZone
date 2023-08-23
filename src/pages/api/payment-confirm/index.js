import dbConnect from 'src/server/utils/dbConnect'
import Transaction from 'src/server/models/transaction.model'
import User from 'src/server/models/user.model'
import RefIncome from 'src/server/models/refIncome.model'
import WithdrawRequest from 'src/server/models/withdrawRequest.model' // Import the withdraw request model

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

  if (req.method === 'POST') {
    try {
      console.log(req.body)

      const { partner_id, amount, status, mode } = req.body

      if (mode === 'payin') {
        const updatedTransaction = await Transaction.findOneAndUpdate(
          { partner_id },
          { amount, status, verify: 1 },
          { new: true }
        )

        if (!updatedTransaction) {
          return res.status(404).json({ error: 'Transaction not found' })
        }

        // Update transaction status and level income
        await updateTransactionStatus(updatedTransaction._id, status)
      } else if (mode === 'payout') {
        // Update withdrawRequest status based on partner_id and status
        const updatedWithdrawRequest = await WithdrawRequest.findOneAndUpdate({ partner_id }, { status }, { new: true })

        if (!updatedWithdrawRequest) {
          return res.status(404).json({ error: 'Withdraw request not found' })
        }
      } else {
        return res.status(400).json({ error: 'Invalid mode' })
      }

      res.status(200).json({ message: 'Payment confirmation received' })
    } catch (error) {
      console.error('Error processing payment confirmation:', error)
      res.status(500).json({ error: 'Error processing payment confirmation' })
    }
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
