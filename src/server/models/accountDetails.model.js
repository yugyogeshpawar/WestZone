// server/models/accountDetails.model.js
import mongoose from 'mongoose';

const accountDetailsSchema = new mongoose.Schema({
  realName: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  ifscCode: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  upiId: {
    type: String,
    required: false,
  }
});

export default mongoose.models.AccountDetails || mongoose.model('AccountDetails', accountDetailsSchema);
