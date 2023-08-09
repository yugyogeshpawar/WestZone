import dbConnect from 'src/server/utils/dbConnect';
import Transaction from 'src/server/models/transaction.model';
import User from 'src/server/models/user.model';
import RefIncome from 'src/server/models/refIncome.model';
import authenticate from 'src/server/middlewares/authenticate';
import axios from 'axios';

export default async (req, res) => {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            authenticate(req, res, async () => {
                console.log("called get method in transaction");
                try {
                    const transaction = await Transaction.findOne({
                        email: req.user.email,
                        status: { $nin: ['successful', 'failed'] }
                    }).sort('-createdAt');

                    if (!transaction) {
                        setTimeout(checkOneTime, 44);

                        return res.status(404).json({ error: 'No transaction found for this user' });
                    }
                    setTimeout(checkOneTime, 600);
                    res.status(200).json(transaction);
                } catch (error) {
                    consle.log("Error details:", error);
                    res.status(500).json({ error: 'Error fetching transaction' });
                }
            });
            break;

        case 'POST':
            authenticate(req, res, async () => {
                console.log("called post method in transaction");
                const { name, email, number, partner_id, amount, status } = req.body;

                // Verify if the authenticated user email is the same as the one in the request
                if (req.user.email !== email) {
                    return res.status(403).json({ error: 'Email does not match the authenticated user' });
                }

                // Basic validation
                if (!name || !email || !number || !partner_id || !amount || !status) {
                    return res.status(400).json({ error: 'All fields are required' });
                }

                try {
                    const transaction = new Transaction({ name, email, number, partner_id, amount, status });
                    await transaction.save();
                    res.status(201).json({ message: 'Transaction initiated successfully', transaction });
                } catch (error) {
                    console.error("Error details:", error);
                    res.status(500).json({ error: 'Error initiating transaction' });
                }
            });
            break;


        case 'PUT':
            authenticate(req, res, async () => {
                console.log("called put method in transaction");
                const { transactionId, status, partner_id } = req.body;

                // Basic validation
                if (!transactionId || !status || !partner_id) {
                    return res.status(400).json({ error: 'Transaction ID and status are required' });
                }

                try {

                    // const transaction = await Transaction.findOneAndUpdate({ partner_id: partner_id }, { status: 'successful' }, { new: true });

                    // if (!transaction) {
                    // return res.status(404).json({ error: 'Transaction not found' });
                    // }

                    // const user = await User.findOne({ email: req.user.email });
                    // if (!user) {
                    //     return res.status(404).json({ error: 'User not found' });
                    // }

                    // await User.findOneAndUpdate({ email: req.user.email }, { $inc: { walletBalance: transaction.amount } });
                    // const sponsorId = user.sponsorId;
                    // console.log("sponsorId:", sponsorId);

                    // await updateLevelIncome(user, transaction.amount, 1);

                    res.status(200).json({ message: 'Transaction updated successfully', transaction });
                } catch (error) {
                    console.error("Error details:", error);
                    res.status(500).json({ error: 'Error updating transaction' });
                }
            });
            break;

        default:
            res.status(405).end(); // Method Not Allowed
            break;
    }
};



const LEVEL_INCOMES = {
    1: 0.10,  // 10% for level 1
    2: 0.05,  // 5% for level 2
    3: 0.02   // 2% for level 3
};

// This will run every day at 2:30 AM
const checkOneTime = async () => {
    try {
        await dbConnect();
        console.log("called checkOneTime method in transaction");

        // Fetch all transactions that are initiated and not successful
        const transactions = await Transaction.find({
            status: { $nin: ['successful', 'failed'] }
        });
        console.log("transactions:", transactions);

        for (const transaction of transactions) {
            const paymentStatus = await checkPaymentStatus(transaction);

            if (paymentStatus === 'successful') {
                await updateTransactionStatus(transaction._id, 'successful');
            } else if (paymentStatus === 'failed') {
                await updateTransactionStatus(transaction._id, 'failed');
            }
        }
    } catch (error) {
        console.error('Error in cron job:', error);
    }
};

async function checkPaymentStatus(transaction) {
    const response = await axios.post('https://secure.sharkpe.in/api/v1/orderStatus', {
        partner_id: transaction.partner_id,
        mode: 'payin'
    }, {
        headers: {
            'x-token': 'll1y4w6b1dytbf787874qoz4'
        }
    });

    if (response.status === 200 && response.data.order_status === 'success') {
        return 'successful';
    } else {
        return 'failed';
    }
}

async function updateTransactionStatus(transactionId, status) {
    console.log("called updateTransactionStatus method in transaction");
    console.log("transactionId:", transactionId, "status:", status);
    const transaction = await Transaction.findByIdAndUpdate(transactionId, { status: status }, { new: true });

    if (status === 'successful') {
        const user = await User.findOne({ email: transaction.email });
        if (user) {
            user.walletBalance += transaction.amount;
            await user.save();
            await updateLevelIncome(user, transaction.amount, 1);
        }
    }
}

async function updateLevelIncome(user, amount, level) {
    if (level > 3 || !user.sponsorId) return;

    const sponsor = await User.findOne({ username: user.sponsorId });
    if (!sponsor) return;

    const income = amount * LEVEL_INCOMES[level];
    sponsor.walletBalance += income;
    await sponsor.save();

    const refIncome = new RefIncome({
        sponsorId: sponsor.username,
        referredUserId: user.username,
        amount: income,
        username: user.username,
        level: level
    });
    await refIncome.save();

    await updateLevelIncome(sponsor, amount, level + 1);
}
