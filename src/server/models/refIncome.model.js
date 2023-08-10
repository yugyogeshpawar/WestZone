// src/server/models/refIncome.model.js

import mongoose from 'mongoose';

const refIncomeSchema = new mongoose.Schema({
    sponsorId: {
        type: String,
        required: true
    },
    referredUserId: {
        type: String,
        required: true
    },
    investAmount: {
        type: Number,
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
    level: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
});

export default mongoose.models.RefIncome || mongoose.model('RefIncome', refIncomeSchema);
