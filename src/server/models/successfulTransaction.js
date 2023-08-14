import mongoose from 'mongoose';

const successfulTransactionSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.models.SuccessfulTransaction || mongoose.model('SuccessfulTransaction', successfulTransactionSchema);
