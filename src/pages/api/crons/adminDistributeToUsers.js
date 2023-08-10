// src/server/routes/adminDistributeToUsers.js

import dbConnect from 'src/server/utils/dbConnect';
import DailyIncome from 'src/server/models/dailyIncome.model';
import User from 'src/server/models/user.model';

export default async (req, res) => {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            // Fetch today's records from DailyIncome
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            const todaysIncomes = await DailyIncome.find({
                date: { $gte: today, $lt: tomorrow },
                paymentStatus: 'pending' // Only fetch records with 'pending' status
            });

            for (let income of todaysIncomes) {
                // Fetch the user corresponding to the income record
                const user = await User.findById(income.userId);

                if (user) {
                    // Update the user's walletBalance and totalEarning
                    user.walletBalance += income.amount;
                    user.totalEarning += income.amount;

                    await user.save();

                    // Update the paymentStatus in the DailyIncome record to 'completed'
                    income.paymentStatus = 'completed';
                    await income.save();
                }
            }

            res.status(200).json({ message: 'Wallet balances and total earnings updated successfully' });
        } catch (error) {
            console.error("Error details:", error);
            res.status(500).json({ error: 'Error updating user balances and earnings' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
};
