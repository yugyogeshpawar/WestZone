// src/server/routes/adminDistributeIncome.js

import dbConnect from 'src/server/utils/dbConnect';
import InvestHistory from 'src/server/models/investDetail.model';
import DailyIncome from 'src/server/models/dailyIncome.model';

export default async (req, res) => {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            // Fetch all InvestHistory records
            const investHistories = await InvestHistory.find({});

            for (let history of investHistories) {
                // Calculate daily income for the user
                const income = history.dailyIncome;

                // Check if a DailyIncome record already exists for this user for today
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);

                const existingRecord = await DailyIncome.findOne({
                    userId: history.userId,
                    date: { $gte: today, $lt: tomorrow }
                });

                if (existingRecord) {
                    // Skip this user if a record already exists for today
                    continue;
                }

                // Check if the number of distributions has reached the terms limit
                const totalDistributions = await DailyIncome.countDocuments({ userId: history.userId });
                if (totalDistributions >= history.terms) {
                    // Skip this user if the terms limit is reached
                    continue;
                }

                // Save the calculated daily income and other details in the DailyIncome collection
                const dailyIncomeEntry = new DailyIncome({
                    userId: history.userId,
                    userName: history.userName,
                    productId: history.productId,
                    investPackage: history.investPackage,
                    amount: income,
                    paymentStatus: 'pending',
                });

                await dailyIncomeEntry.save();
            }

            res.status(200).json({ message: 'Daily income and details saved successfully' });
        } catch (error) {
            console.error("Error details:", error);
            res.status(500).json({ error: 'Error saving daily income details' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
};
