import dbConnect from 'src/server/utils/dbConnect'
import Transaction from 'src/server/models/transaction.model'
import User from 'src/server/models/user.model'
import RefIncome from 'src/server/models/refIncome.model'
import axios from 'axios'
import cron from 'node-cron'

const API_URL = 'https://secure.sharkpe.in/api/v1/orderStatus'

const API_HEADERS = {
  'x-token': 'll7s4cwt1f47bf7878dn4pad'
}

const LEVEL_INCOMES = {
  1: 0.1,
  2: 0.05,
  3: 0.02
}
let isCronRunning = false

async function checkPaymentStatus(transaction) {
  try {
    const response = await axios.post(
      API_URL,
      {
        partner_id: transaction.partner_id,
        mode: 'payin'
      },
      { headers: API_HEADERS }
    )

    if (response.status === 200 && response.data.order_status === 'success') {
      return 'successful'
    } else if (response.status === 200 && response.data.order_status === 'failed') {
      return 'failed'
    } else {
      return 'pending'
    }
  } catch (error) {
    console.error('Error:', error)

    return 'failed'
  }
}

async function updateLevelIncome(user, amount, level) {
  if (level > 3 || !user.sponsorId) return

  const sponsor = await User.findOne({ username: user.sponsorId })
  if (!sponsor) return

  const income = amount * LEVEL_INCOMES[level]
  console.log('income', income, amount, LEVEL_INCOMES[level]);
  sponsor.walletBalance += income
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

  if (status === 'successful') {
    const user = await User.findOne({ email: transaction.email })
    if (user) {
      user.walletBalance += transaction.amount
      await user.save()
      await updateLevelIncome(user, transaction.amount, 1)
    }
  }
}

const checkOneTime = async () => {
  await dbConnect()

  const transactions = await Transaction.find({
    status: { $nin: ['successful', 'failed'] }
  })

  for (const transaction of transactions) {
    const paymentStatus = await checkPaymentStatus(transaction)

    if (['successful', 'failed'].includes(paymentStatus)) {
      await updateTransactionStatus(transaction._id, paymentStatus)
    }
  }
}

export default async (req, res) => {
  try {
    if (req.method === 'GET') {
      checkOneTime()
      if (!isCronRunning) {
        cron.schedule('* */6 * * * *', checkOneTime)
        isCronRunning = true
        res.status(200).json({ message: 'Task scheduled to run every 6 minutes' })
      } else {
        res.status(200).json({ message: 'Task is already scheduled.' })
      }
    } else {
      res.status(405).end() // Method Not Allowed
    }
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
