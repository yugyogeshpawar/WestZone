// otpVerification.model.js

const mongoose = require('mongoose')

const otpVerificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  otp: { type: Number, required: true },
  verificationToken: { type: String, required: true },
  expires: { type: Date, required: true }
})

module.exports = mongoose.models.OtpVerification || mongoose.model('OtpVerification', otpVerificationSchema)
