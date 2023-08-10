// src/server/routes/updateRefIncome.js

import dbConnect from 'src/server/utils/dbConnect';
import RefIncome from 'src/server/models/refIncome.model';

export default async (req, res) => {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // Fetch all records from the RefIncome collection
                const refIncomes = await RefIncome.find({});

                // Iterate over each record and update the investAmount
                for (let income of refIncomes) {
                    let percent;

                    // Determine the percent based on level
                    if (income.level === 1) {
                        percent = 10;
                    } else if (income.level === 2) {
                        percent = 5;
                    } else if (income.level === 3) {
                        percent = 2.5;
                    } else {
                        // If level is not 1, 2, or 3, skip this record
                        percent = 10;
                    }

                    // Calculate investAmount
                    income.investAmount = income.amount / percent;
                    console.log("income.investAmount:", income.investAmount);
                    income.level = 1;
                    income.status = true;

                    // Save the updated record
                    const response = await income.save();
                    console.log("response:", response);
                }

                res.status(200).json({ message: 'RefIncome records updated successfully!' });
            } catch (error) {
                console.error("Error details:", error);
                res.status(500).json({ error: 'Error updating RefIncome records' });
            }
            break;

        default:
            res.status(405).end(); // Method Not Allowed
            break;
    }
};
