// src/server/routes/payin_request.js
import dbConnect from 'src/server/utils/dbConnect'
import UpiTransaction from 'src/server/models/upiTransaction.model'
import authenticate from 'src/server/middlewares/authenticate'

export default async (req, res) => {
  await dbConnect()

  const { method } = req

  switch (method) {
    case 'POST':
      authenticate(req, res, async () => {
        try {
          const { userName, amount } = req.body
          if (!userName || !amount) {
            return res.status(400).json({ success: false, error: 'Missing required fields' })
          }

          const newTransaction = new UpiTransaction({
            userName,
            amount,
            status: 'Pending',
            transactionDate: Date.now()
          })

          const savedTransaction = await newTransaction.save()

          const upiId = '8107821182@okbizaxis'
          const yourName = 'Westzonestore'
          const upiLink = `upi://pay?pa=${upiId}&pn=${yourName}&am=${amount}&cu=INR`

          res.status(201).json({
            success: true,
            transaction: savedTransaction,
            qrValue: upiId,
            yourName: yourName
          })
        } catch (error) {
          res.status(500).json({ success: false, error: error.message })
        }
      })
      break

    case 'GET':
      authenticate(req, res, async () => {
        try {
          const { userName } = req.query
          if (!userName) {
            return res.status(400).json({ success: false, error: 'Missing userName parameter' })
          }

          const transactions = await UpiTransaction.find({ userName }).sort({ transactionDate: -1 })
          res.status(200).json({ success: true, transactions })
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
