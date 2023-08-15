import dbConnect from 'src/server/utils/dbConnect';
import Transaction from 'src/server/models/transaction.model';
import User from 'src/server/models/user.model';
import axios from 'axios';
import cron from 'node-cron';

const API_URL = 'https://secure.sharkpe.in/api/v1/orderStatus';

const API_HEADERS = {
    'x-token': 'll7s4cwt1f47bf7878dn4pad'
};


let isCronRunning = false;
let isConfirmCronRunning = false;

async function checkPaymentStatus(transaction) {
    const response = await axios.post(API_URL, {
        partner_id: transaction.partner_id,
        mode: 'payin'
    }, { headers: API_HEADERS });

    if (response.status === 200 && response.data.order_status === 'success') {
        return 'successful';
    }

    return 'failed';
}


async function updateTransactionStatus(transactionId, status) {
    const transaction = await Transaction.findByIdAndUpdate(transactionId, { status: status }, { new: true });

    if (status === 'successful') {
        const user = await User.findOne({ email: transaction.email });
        if (user) {
            user.walletBalance += transaction.amount;
            await user.save();
        }
    }
}

const checkOneTime = async () => {
    await dbConnect();

    const transactions = await Transaction.find({
        status: { $nin: ['successful', 'failed'] }
    });

    for (const transaction of transactions) {
        const paymentStatus = await checkPaymentStatus(transaction);

        if (['successful', 'failed'].includes(paymentStatus)) {
            await updateTransactionStatus(transaction._id, paymentStatus);
        }
    }
};

const checkConfirmedPayments = async () => {
    await dbConnect();

    const transactions = await Transaction.find({
        status: 'successful'
    });

    for (const transaction of transactions) {
        const user = await User.findOne({ email: transaction.email });
        if (user) {
            user.walletBalance -= transaction.amount;
            await user.save();
        }
    }
};

export default async (req, res) => {
    try {
        if (req.method === 'GET') {
            if (!isCronRunning) {
                cron.schedule('* */6 * * * *', checkOneTime);
                isCronRunning = true;
                res.status(200).json({ message: 'Task scheduled to run every 6 minutes' });
            } else {
                res.status(200).json({ message: 'Task is already scheduled.' });
            }

            if (!isConfirmCronRunning) {
                cron.schedule('* */6 * * * *', checkConfirmedPayments);
                isConfirmCronRunning = true;
                res.status(200).json({ message: 'Confirmation task scheduled to run every 6 minutes' });
            } else {
                res.status(200).json({ message: 'Confirmation task is already scheduled.' });
            }
        } else {
            res.status(405).end(); // Method Not Allowed
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
