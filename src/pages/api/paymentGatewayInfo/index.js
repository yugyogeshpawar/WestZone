
import dbConnect from 'src/server/utils/dbConnect';
import PaymentGatewayInfo from 'src/server/models/paymentGatewayInfo.model';
import authenticate from 'src/server/middlewares/authenticate';

export default async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case 'GET':
            authenticate(req, res, getPaymentGatewayInfo);
            break;
        case 'POST':
            authenticate(req, res, updatePaymentGatewayInfo);
            break;
        default:
            res.status(405).end(); // Method Not Allowed
            break;
    }
};

const getPaymentGatewayInfo = async (req, res) => {
    try {
        const info = await PaymentGatewayInfo.findOne();
        if (!info) {
            return res.status(404).json({ error: 'No payment gateway info found' });
        }
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching payment gateway info' });
    }
};

const updatePaymentGatewayInfo = async (req, res) => {
    const { partner_id, x_token } = req.body;

    if (!partner_id || !x_token) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        let info = await PaymentGatewayInfo.findOne();
        if (info) {
            info.partner_id = partner_id;
            info.x_token = x_token;
            await info.save();
        } else {
            info = new PaymentGatewayInfo({ partner_id, x_token });
            await info.save();
        }
        res.status(200).json({ message: 'Payment gateway info updated successfully', info });
    } catch (error) {
        res.status(500).json({ error: 'Error updating payment gateway info' });
    }
};
