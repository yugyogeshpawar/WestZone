const User = require('src/server/models/user.model');
const RefIncome = require('src/server/models/refIncome.model');
const cron = require('node-cron');
const axios = require('axios');
const dbConnect = require('src/server/utils/dbConnect');
const Transaction = require('src/server/models/transaction.model');

const LEVEL_INCOMES = {
    1: 0.10,  // 10% for level 1
    2: 0.05,  // 5% for level 2
    3: 0.02   // 2% for level 3
};

// This will run every day at 2:30 AM
cron.schedule('*/10 * * * *', async () => {
    try {
        await dbConnect();

        // Fetch all transactions that are initiated and not successful
        const transactions = await Transaction.find({
            status: { $nin: ['successful', 'failed'] }
        });

        for (const transaction of transactions) {
            const paymentStatus = await checkPaymentStatus(transaction);

            if (paymentStatus === 'successful') {
                await updateTransactionStatus(transaction._id, 'successful');
            }
        }
    } catch (error) {
        console.error('Error in cron job:', error);
    }
});

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

// Start the cron job
cron.start();
