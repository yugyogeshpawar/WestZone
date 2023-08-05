const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    mobileNumber: { type: String, required: true, unique: true, match: [/^\d{10}$/, 'Please enter a valid mobile number.'] },
    email: { type: String, required: true, unique: true, match: [/\S+@\S+\.\S+/, 'Please enter a valid email address.'] },
    sponsorId: { type: String, default: null }, // Can be null
    sponsorName: { type: String, default: null }, // Can be null
    position: { type: String },
    status: { type: Boolean, default: false }, // Updated to Boolean type
    kycStatus: { type: Boolean, default: false },
    topupAmt: { type: Number, default: 0 },
    walletBalance: { type: Number, default: 0 },
    directMember: { type: Number, default: 0 },
    teamBusiness: { type: Number, default: 0 },
    withdrawAmt: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false },
    currentInvst: { type: Number, default: 0 },
    directBusiness: { type: Number, default: 0 },
    totalEarning: { type: Number, default: 0 },
    totalTeam: { type: Number, default: 0 },
    activationDate: { type: Date }
},
    {
        timestamps: true,
    });


module.exports = mongoose.models.User || mongoose.model('User', userSchema);
