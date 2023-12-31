import mongoose from 'mongoose';

const accountDetailsSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    realName: {
        type: String,
        required: true,
        trim: true,
    },
    bankName: {
        type: String,
        required: true,
        trim: true,
    },
    accountNumber: {
        type: String,
        required: true,
        trim: true,
    },
    ifscCode: {
        type: String,
        required: true,
        trim: true,
    },
    upiId: {
        type: String,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'processed', 'failed'],
        default: 'pending',
    },
    requestDate: {
        type: Date,
        default: Date.now,
    },
    processedDate: {
        type: Date,
    },
    notes: {
        type: String,
        trim: true,
    },
});

const AccountDetails = mongoose.models.AccountDetails || mongoose.model('AccountDetails', accountDetailsSchema);

export default AccountDetails;
