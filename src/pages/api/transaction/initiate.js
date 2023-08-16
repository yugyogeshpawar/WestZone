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

                        return res.status(404).json({ error: 'No transaction found for this user' });
                    }
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





