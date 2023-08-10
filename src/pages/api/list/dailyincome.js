// src/server/routes/dailyIncomeList.js

import dbConnect from 'src/server/utils/dbConnect';
import DailyIncome from 'src/server/models/dailyIncome.model';
import authenticate from 'src/server/middlewares/authenticate';

export default async (req, res) => {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            authenticate(req, res, async () => {
                try {
                    const { username } = req.user;

                    if (!username) {
                        return res.status(400).json({ message: 'Username is required' });
                    }

                    const userDailyIncomes = await DailyIncome.find({ userName: username }).lean();

                    if (!userDailyIncomes || userDailyIncomes.length === 0) {
                        return res.status(404).json({ message: 'No daily incomes found for this user' });
                    }

                    res.status(200).json({ dailyIncomes: userDailyIncomes });
                } catch (error) {
                    console.error("Error details:", error);
                    res.status(500).json({ error: 'Error fetching daily incomes' });
                }
            });
            break;

        default:
            res.status(405).end(); // Method Not Allowed
            break;
    }
};
