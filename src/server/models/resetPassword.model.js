// src/server/models/resetPassword.model.js

import mongoose from 'mongoose'

const resetPasswordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  resetPasswordToken: {
    type: String,
    required: true
  },
  resetPasswordExpires: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.models.ResetPassword || mongoose.model('ResetPassword', resetPasswordSchema);
