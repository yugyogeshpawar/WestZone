import dbConnect from 'src/server/utils/dbConnect';
import InvestHistory from 'src/server/models/investDetail.model';
import DailyIncome from 'src/server/models/dailyIncome.model';
import cron from 'node-cron';

let isCronScheduled = false; // Flag to check if cron is already scheduled

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const distributeIncome = async () => {
    await dbConnect();

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
                console.log(`Record already exists for user ${history.userId} for today`);

                // Skip this user if a record already exists for today
                continue;
            }

            console.log(`Distributing ${income} to user ${history.userId}`);

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
            await sleep(2000);
        }
    } catch (error) {
        console.error("Error details:", error);
    }
};

export default async (req, res) => {
    if (req.method === 'GET') {
        await distributeIncome();
        if (!isCronScheduled) {
            // Schedule the task to run every day at 6 AM
            cron.schedule('0 10 * * *', distributeIncome);
            isCronScheduled = true; // Set the flag to true
            res.status(200).json({ message: 'Task scheduled to run every day at 10 AM' });
        } else {
            res.status(200).json({ message: 'Task is already scheduled to run.' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
};
