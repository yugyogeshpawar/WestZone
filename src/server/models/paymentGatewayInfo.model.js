import mongoose from 'mongoose';

const paymentGatewayInfoSchema = new mongoose.Schema({
    sample_partner_id: {
        type: String,
    },
    api_key: {
        type: String,
        required: true
    },
    endpoint_url: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.PaymentGatewayInfo || mongoose.model('PaymentGatewayInfo', paymentGatewayInfoSchema);
