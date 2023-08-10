import mongoose from 'mongoose'

const investDetailSchema = new mongoose.Schema({
  dateTime: {
    type: Date,
    default: Date.now,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  investPackage: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['purchased', 'cancelled', 'refunded'],
    default: 'purchased',
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  },
  terms: {
    type: Number,
    required: true
  },
  dailyIncome: { 
    type: Number,
    required: true
  },
  totalRevenue: {
    type: Number,
    required: true
  }
})
const InvestHistory = mongoose.models.InvestHistory || mongoose.model('InvestHistory', investDetailSchema)

export default InvestHistory
