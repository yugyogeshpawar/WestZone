import mongoose from 'mongoose'

const withdrawRequestSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  realName: {
    type: String,
    required: true,
    trim: true
  },
  bankName: {
    type: String,
    required: true,
    trim: true
  },
  accountNumber: {
    type: String,
    required: true,
    trim: true
  },
  ifscCode: {
    type: String,
    required: true,
    trim: true
  },
  upiId: {
    type: String,
    default: 'need to add'
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processed', 'failed', 'success'],
    default: 'pending'
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  processedDate: {
    type: Date
  },
  partner_id: {
    // New field
    type: String, // Set the type of the field
    default: null // Default value for the field (optional)
  }
})

const WithdrawRequest = mongoose.models.WithdrawRequest || mongoose.model('WithdrawRequest', withdrawRequestSchema)

export default WithdrawRequest
