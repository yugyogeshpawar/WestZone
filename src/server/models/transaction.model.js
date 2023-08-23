// src/server/models/transaction.model.js
import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  partner_id: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  verify: { type: Number, default: 0 }, // New field
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema)
