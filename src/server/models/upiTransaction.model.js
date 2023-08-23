// src/server/models/upiTransaction.model.js
import mongoose from 'mongoose'

const upiTransactionSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Verified'], default: 'Pending' },
  transactionDate: { type: Date, default: Date.now }
})

const UpiTransaction = mongoose.models.UpiTransaction || mongoose.model('UpiTransaction', upiTransactionSchema)

export default UpiTransaction
